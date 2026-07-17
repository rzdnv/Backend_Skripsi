import { ADMIN_ROLE } from "@prisma/client"
import { AppError } from "../../middleware/error-handler"
import { ERROR_CODE, IQueryParams } from "../../interface"
import * as itemRepository from "../item/item.repository"
import * as itemBalanceRepository from "./item-balance.repository"
import { IBodyCreateItemBalanceModel } from "../item-balance/item-balance.model"
import { metaPagination } from "../../utils/meta-pagination"
import { mapperItemBalance } from "./item-balance.mapper"
import ExcelJS from 'exceljs'
import { Response } from "express"

export const createItemBalance = async ({
    body,
    token
}: {
    body: IBodyCreateItemBalanceModel,
    token: {
        name: string
        id: number
        telephone: string
        role: ADMIN_ROLE
    }
}) => {
    const { itemId, amount } = body

    const cekItem = await itemRepository.getItemById({
        itemId: itemId
    })

    if (!cekItem) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Barang tidak ditemukan')
    }

    if (cekItem.stock < body.amount) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Stock tidak mencukupi')
    }

    const balance = cekItem.stock - body.amount

    const reduction = await itemRepository.stockItemReduction({
        itemId: itemId,
        stock: balance
    })

    const last = await itemBalanceRepository.getLastDataItemBalance()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/OPN-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'OPN-' + nextNumber.toString().padStart(6, '0');

    return await itemBalanceRepository.createItemBalance({
        data: { ...body, amount: balance },
        finalStock: body.amount,
        initialStock: cekItem.stock,
        code,
        adminId: token.id
    })
}

export const getAllItemBalance = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemBalanceRepository.getAllItemBalance({
        query
    })

    const count = await itemBalanceRepository.getCountAllItemBalance({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemBalance(data), meta }
}


export const softDeletedItemBalance = async ({
    itemBalanceId
}: {
    itemBalanceId: number
}) => {
    const item = await itemBalanceRepository.getItemBalanceById({
        itemBalanceId
    })

    if (!item) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Id stok balance tidak ditemukan')
    }

    await itemBalanceRepository.softDeletedItemBalance({
        itemBalanceId
    })

    await itemRepository.stockItemRestock({
        itemId: item.itemId,
        stock: item.amount
    })
    return { message: 'Data berhasil dihapus' }
}

export const getDownloadListItemBalance = async ({
    query,
    res
}: {
    query: IQueryParams,
    res: Response
}) => {
    try {

        const barangOpname = await itemBalanceRepository.getAllItemBalance({
            query
        })

        // Buat workbook dan worksheet baru
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('List Data Opname');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Kode Opname', key: 'code', width: 20 },
            { header: 'Petugas', key: 'petugas', width: 25 },
            { header: 'Nama Barang', key: 'namaBarang', width: 30 },
            { header: 'Stok Sistem', key: 'stokSistem', width: 15 },
            { header: 'Stok Fisik', key: 'stokFisik', width: 15 },
            { header: 'Selisih', key: 'selisih', width: 10 },
            { header: 'Kode Barang', key: 'kodeBarang', width: 20 },
            { header: 'Kategori', key: 'kategori', width: 20 },
            { header: 'Lokasi', key: 'lokasi', width: 20 },
            { header: 'Supplier', key: 'supplier', width: 25 },
            { header: 'Merek', key: 'merek', width: 20 },
            { header: 'Berita Acara', key: 'berita', width: 30 },
            { header: 'Deskripsi', key: 'deskripsi', width: 30 },
            { header: 'Dibuat', key: 'dibuat', width: 25 },
        ];



        barangOpname.forEach((brg, index) => {
            const stokSistem = brg.initialStock ?? 0;
            const stokFisik = brg.finalStock ?? 0;
            const selisih = stokFisik - stokSistem;

            const row = worksheet.addRow({
                no: index + 1,
                code: brg.code || '',
                petugas: brg.admin?.name || '',
                namaBarang: brg.item?.title || '',
                stokSistem: stokSistem,
                stokFisik: stokFisik,
                selisih: selisih,
                kodeBarang: brg.item?.code || '',
                kategori: brg.item?.category?.title || '',
                lokasi: brg.item?.location || '',
                supplier: brg.item?.supplier || '',
                merek: brg.item?.brand || '',
                berita: brg.news || '',
                deskripsi: brg.description || '',
                dibuat: new Date(brg.createdAt || '').toLocaleDateString('id-ID')
            });

            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { horizontal: 'left' };
            });
        });



        worksheet.getRow(1).eachCell((cell) => {
            cell.alignment = { horizontal: 'left' };
        });

        // res.setHeader(
        //     'Content-Type',
        //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // );
        // res.setHeader(
        //     'Content-Disposition',
        //     'attachment; filename=' + `List-Data-Opname(${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}).xlsx`
        // );
        const fileName = `List-Barang-(${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}).xlsx`;

        // 1. Atur Content-Disposition menggunakan metode Express (lebih aman)
        res.attachment(fileName);

        // 2. Atur Content-Type secara eksplisit
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        await workbook.xlsx.write(res);


        res.end();
    } catch (error) {
        console.error('Error generating Excel file', error);
        res.status(500).send('Error generating Excel file');
    }
}