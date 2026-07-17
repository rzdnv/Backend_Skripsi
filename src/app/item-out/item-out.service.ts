import { IBodyCreateItemOutModel } from "./item-out.model"
import * as itemRepository from "../item/item.repository";
import * as itemOutRepository from "./item-out.repository";
import { ADMIN_ROLE } from "@prisma/client";
import { AppError } from "../../middleware/error-handler";
import { ERROR_CODE, IQueryParams } from "../../interface";
import { metaPagination } from "../../utils/meta-pagination";
import { mapperItemOut } from "./item-out.mapper";
import ExcelJS from 'exceljs'
import { Response } from "express";

export const createItemOut = async ({
    body,
    token
}: {
    body: IBodyCreateItemOutModel,
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
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Item tidak ditemukan')
    }

    if (cekItem.stock < body.amount) {
        return new AppError(ERROR_CODE.BAD_REQUEST.code, 'Stock tidak mencukupi')
    }

    await itemRepository.stockItemReduction({
        itemId: itemId,
        stock: amount
    })

    const last = await itemOutRepository.getLastDataItemOut()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/OUT-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'OUT-' + nextNumber.toString().padStart(6, '0');

    return await itemOutRepository.createItemOut({
        data: body,
        code,
        adminId: token.id
    })
}

export const getAllItemOut = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemOutRepository.getAllItemOut({
        query
    })

    const count = await itemOutRepository.getCountAllItemOut({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemOut(data), meta }
}

export const softDeletedItemOut = async ({
    itemOutId
}: {
    itemOutId: number
}) => {
    const item = await itemOutRepository.getItemOutById({
        itemOutId
    })

    if (!item) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Id barang keluar tidak ditemukan')
    }

    await itemOutRepository.softDeletedItemOut({
        itemOutId
    })

    await itemRepository.stockItemRestock({
        itemId: item.itemId,
        stock: item.amount
    })
    return { message: 'Data berhasil dihapus' }
}

export const getDownloadListItemOut = async ({
    query,
    res
}: {
    query: IQueryParams,
    res: Response
}) => {
    try {

        const barangKeluar = await itemOutRepository.getAllItemOut({
            query
        })

        // Buat workbook dan worksheet baru
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('List Barang Masuk');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Kode Barang Keluar', key: 'kodeKeluar', width: 20 },
            { header: 'Pengambil', key: 'pengambil', width: 25 },
            { header: 'Divisi', key: 'divisi', width: 20 },
            { header: 'Telepon', key: 'telepon', width: 18 },
            { header: 'Nama Barang', key: 'namaBarang', width: 30 },
            { header: 'Jumlah', key: 'jumlah', width: 10 },
            { header: 'Kode Barang', key: 'kodeBarang', width: 20 },
            { header: 'Kategori', key: 'kategori', width: 20 },
            { header: 'Berita Acara', key: 'berita', width: 30 },
            { header: 'Petugas', key: 'petugas', width: 25 },
            { header: 'Dibuat', key: 'dibuat', width: 25 },
        ];


        barangKeluar.forEach((brg, index) => {
            const row = worksheet.addRow({
                no: index + 1,
                kodeKeluar: brg.code || '',
                pengambil: brg.user?.name || '',
                divisi: brg.user?.division?.title || '',
                telepon: brg.user?.telephone || '',
                namaBarang: brg.item?.title || '',
                jumlah: brg.amount ?? 0,
                kodeBarang: brg.item?.code || '',
                kategori: brg.item?.category?.title || '',
                berita: brg.news || '',
                petugas: brg.admin?.name || '',
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
        //     'attachment; filename=' + `List-Barang-Keluar-(${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}).xlsx`
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