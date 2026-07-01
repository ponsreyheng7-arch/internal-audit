// Firebase Service - Export Functions
// Main Firebase CRUD operations are now in index.html

// ✅ នាំចេញ Excel តាមផ្នែក
window.exportToExcelByDept = function(dept) {
    if (!window.auditData || window.auditData.length === 0) {
        if (window.showToast) showToast("❌ គ្មានទិន្នន័យដែលលម្អិត");
        return;
    }

    const filteredData = dept ? window.auditData.filter(item => item.dept === dept) : window.auditData;
    
    if (filteredData.length === 0) {
        if (window.showToast) showToast("❌ គ្មានទិន្នន័យសម្រាប់ផ្នែក: " + dept);
        return;
    }

    const excelData = filteredData.map(item => ({
        'ផ្នែក': item.dept,
        'បញ្ហា': item.problem,
        'ដំណោះស្រាយ': item.solution,
        'អ្នកទទួលខុសត្រូវ': item.pic,
        'ស្ថានភាព': item.status,
        'កាលបរិច្ឆេទ': item.date
    }));

    try {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Data");

        const columnWidths = [15, 25, 25, 20, 15, 15];
        worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));

        const fileName = `Audit_${dept || 'All'}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        
        if (window.showToast) showToast(`✅ បាននាំចេញ ${filteredData.length} ធាតុក្នុងឯកសារ Excel!`);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        if (window.showToast) showToast("❌ មិនអាចនាំចេញ Excel បានទេ");
    }
};

// ✅ នាំចេញ Excel ទាំងអស់
window.exportToExcelAll = function() {
    window.exportToExcelByDept(null);
};

console.log("✅ Firebase Service loaded (Export functions ready)");
