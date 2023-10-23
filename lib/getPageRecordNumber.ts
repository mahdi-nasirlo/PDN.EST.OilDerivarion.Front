function GetPageRecordNumber(page: number = 1, itemsPerPage: number = 5) {

    const fromRecord = (page - 1) * itemsPerPage + 1

    const selectRecord = page * itemsPerPage

    return {fromRecord, selectRecord}

}

export default GetPageRecordNumber;