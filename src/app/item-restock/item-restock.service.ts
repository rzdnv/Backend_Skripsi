import * as itemRepository from "../item/item.repository";
import * as itemRestockRepository from "./item-restock.repository";
import { ADMIN_ROLE } from "@prisma/client";
import { AppError } from "../../middleware/error-handler";
import { ERROR_CODE, IQueryParams } from "../../interface";
import { metaPagination } from "../../utils/meta-pagination";
import { IBodyCreateItemRestockModel } from "./item-restock.model";
import { mapperItemRestock } from "./item-restock.mapper";
import ExcelJS from 'exceljs'
import { Response } from "express";

export const createItemRestock = async ({
    body,
    token
}: {
    body: IBodyCreateItemRestockModel,
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

    await itemRepository.stockItemRestock({
        itemId: itemId,
        stock: amount
    })

    const last = await itemRestockRepository.getLastDataItemRestock()
    let nextNumber = 1;

    if (last && last.code) {
        const match = last.code.match(/IN-(\d+)/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }

    const code = 'IN-' + nextNumber.toString().padStart(6, '0');

    return await itemRestockRepository.createItemRestock({
        data: body,
        code,
        adminId: token.id
    })
}

export const getAllItemRestock = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemRestockRepository.getAllItemRestock({
        query
    })

    const count = await itemRestockRepository.getCountAllItemRestock({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItemRestock(data), meta }
}

export const getDownloadListItemRestock = async ({
    query,
    res
}: {
    query: IQueryParams,
    res: Response
}) => {
    try {

        const barangMasuk = await itemRestockRepository.getAllItemRestock({
            query
        })

        // Buat workbook dan worksheet baru
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('List Barang Masuk');

        // Definisikan kolom untuk worksheet
        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Kode Barang Masuk', key: 'code', width: 20 },
            { header: 'Petugas', key: 'petugas', width: 25 },
            { header: 'Nama Barang', key: 'namaBarang', width: 30 },
            { header: 'Jumlah', key: 'jumlah', width: 10 },
            { header: 'Kode Barang', key: 'kodeBarang', width: 20 },
            { header: 'Kategori', key: 'kategori', width: 20 },
            { header: 'Lokasi', key: 'lokasi', width: 20 },
            { header: 'Supplier', key: 'supplier', width: 25 },
            { header: 'Merek', key: 'merek', width: 20 },
            { header: 'Berita Acara', key: 'berita', width: 30 },
            { header: 'Deskripsi', key: 'deskripsi', width: 30 },
            { header: 'Dibuat', key: 'dibuat', width: 25 },
        ];


        // Tambahkan data ke worksheet
        barangMasuk.forEach((brg, index) => {
            const row = worksheet.addRow({
                no: index + 1,
                code: brg.code || '',
                petugas: brg.admin?.name || '',
                namaBarang: brg.item?.title || '',
                jumlah: brg.amount ?? 0,
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
        //     'attachment; filename=' + `List-Barang-Masuk-(${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}).xlsx`
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