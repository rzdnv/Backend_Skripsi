import * as itemRepository from "./item.repository";

import { ERROR_CODE, IQueryParams } from "../../interface"
import { metaPagination } from "../../utils/meta-pagination";
import { AppError } from "../../middleware/error-handler";
import { IBodyCreateItemModel } from "./item.model";
import { mapperItem } from "./item.mapper";
import ExcelJS from 'exceljs'
import { Response } from "express";

// export const updateUnit = async ({
//     body,
//     params: { unitId }
// }: {
//     body: IBodyCreateUnitModel,
//     params: { unitId?: string }

// }) => {

//     const cekDivision = await itemRepository.getUnitById({
//         unitId: Number(unitId)
//     })

//     if (!cekDivision) {
//         return new AppError(ERROR_CODE.NOT_FOUND.code, 'Division tidak ditemukan')
//     }

//     return await itemRepository.updateUnitById({
//         unitId: Number(unitId),
//         data: body,
//     })
// }

export const createItem = async ({
    body,
}: {
    body: IBodyCreateItemModel,
}) => {
    return await itemRepository.createItem({
        data: body,
    })
}
export const updateItem = async ({
    body,
    itemId
}: {
    body: IBodyCreateItemModel,
    itemId: number
}) => {

    const cekItem = await itemRepository.getItemById({ itemId })

    if (!cekItem) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Item tidak ditemukan')
    }

    return await itemRepository.updateItem({
        itemId,
        data: body,
    })
}

export const getAllItem = async ({
    query
}: {
    query: IQueryParams
}) => {
    const { page = '1', perPage = '10' } = query

    const data = await itemRepository.getAllItem({
        query
    })

    const count = await itemRepository.getCountAllItem({
        query
    })

    const meta = metaPagination(
        Number(page),
        Number(perPage),
        data.length,
        count,
    )

    return { data: mapperItem(data), meta }
}

export const getDownloadListItem = async ({
    query,
    res
}: {
    query: IQueryParams,
    res: Response
}) => {
    try {

        const barang = await itemRepository.getAllItem({
            query
        })

        // Buat workbook dan worksheet baru
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('List Barang');

        // Definisikan kolom untuk worksheet
        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Nama', key: 'nama', width: 30 },
            { header: 'Kode Barang', key: 'kode', width: 20 },
            { header: 'Merk', key: 'merk', width: 20 },
            { header: 'Lokasi', key: 'lokasi', width: 20 },
            { header: 'Supplier', key: 'supplier', width: 25 },
            { header: 'Stok', key: 'stok', width: 10 },
            { header: 'Harga', key: 'harga', width: 15 },
            { header: 'Deskripsi', key: 'deskripsi', width: 40 },
            { header: 'Satuan', key: 'satuan', width: 10 },
            { header: 'Kategori', key: 'kategori', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Dibuat', key: 'dibuat', width: 20 },
            { header: 'Terakhir Diubah', key: 'updated', width: 20 },
        ];

        // Tambahkan data ke worksheet
        barang.forEach((brg, index) => {
            const row = worksheet.addRow({
                no: index + 1,
                nama: brg.title || '',
                kode: brg.code || '',
                merk: brg.brand || '',
                lokasi: brg.location || '',
                supplier: brg.supplier || '',
                stok: brg.stock ?? 0,
                harga: brg.price ?? 0,
                deskripsi: brg.description || '',
                satuan: brg.unit.title || '',
                kategori: brg.category.title || '',
                status: brg.isActive ? 'Aktif' : 'Tidak Aktif',
                dibuat: new Date(brg.createdAt || '').toLocaleDateString('id-ID'),
                updated: new Date(brg.updatedAt || '').toLocaleDateString('id-ID')

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
        //     'attachment; filename=' + `List-Barang-(${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}).xlsx`
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

export const updateIsActive = async ({
    body,
    itemId
}: {
    body: {
        isActive: boolean
    },
    itemId: number
}) => {
    const { isActive } = body

    const item = await itemRepository.getItemById({
        itemId
    })

    if (!item) {
        return new AppError(ERROR_CODE.NOT_FOUND.code, 'Barang tidak ditemukan')
    }

    return await itemRepository.updateIsActive({
        isActive,
        itemId
    })
}