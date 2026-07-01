// Firebase Service Functions
// ឧបករណ៍សម្រាប់ CRUD operations ជាមួយ Firestore

// ✅ សរុបសេចក្តីយូង Firebase
async function loadAuditDataFromFirebase() {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return data;
    } catch (error) {
        console.error("Error loading data from Firebase:", error);
        showToast("❌ មិនអាចរក្សាទុកទិន្នន័យពីលើ Firebase បានទេ");
        return [];
    }
}

// ✅ បន្ថែមទិន្នន័យក្នុង Firebase
async function addAuditDataToFirebase(entry) {
    try {
        const docRef = await db.collection(COLLECTION_NAME).add({
            dept: entry.dept,
            problem: entry.problem,
            solution: entry.solution,
            pic: entry.pic,
            status: entry.status,
            date: entry.date,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log("Document added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        showToast("❌ មិនអាចបន្ថែមទិន្នន័យក្នុង Firebase បានទេ");
        return null;
    }
}

// ✅ កែសម្រួលទិន្នន័យក្នុង Firebase
async function updateAuditDataInFirebase(docId, entry) {
    try {
        await db.collection(COLLECTION_NAME).doc(docId).update({
            dept: entry.dept,
            problem: entry.problem,
            solution: entry.solution,
            pic: entry.pic,
            status: entry.status,
            date: entry.date,
            updatedAt: new Date()
        });
        console.log("Document updated with ID:", docId);
        return true;
    } catch (error) {
        console.error("Error updating document:", error);
        showToast("❌ មិនអាចកែសម្រួលទិន្នន័យក្នុង Firebase បានទេ");
        return false;
    }
}

// ✅ លុបទិន្នន័យក្នុង Firebase
async function deleteAuditDataFromFirebase(docId) {
    try {
        await db.collection(COLLECTION_NAME).doc(docId).delete();
        console.log("Document deleted with ID:", docId);
        return true;
    } catch (error) {
        console.error("Error deleting document:", error);
        showToast("❌ មិនអាចលុបទិន្នន័យក្នុង Firebase បានទេ");
        return false;
    }
}

// ✅ ស្វែងរក duplicate ពីលើ Firebase
async function checkDuplicateInFirebase(dept, problem) {
    try {
        const query = await db.collection(COLLECTION_NAME)
            .where("dept", "==", dept)
            .where("problem", "==", problem)
            .get();
        return !query.empty;
    } catch (error) {
        console.error("Error checking duplicate:", error);
        return false;
    }
}

// ✅ លម្អិត Excel តាមផ្នែក
function exportToExcelByDept(dept) {
    if (auditData.length === 0) {
        showToast("❌ គ្មានទិន្នន័យដែលលម្អិត");
        return;
    }

    // Filter data by department
    const filteredData = dept ? auditData.filter(item => item.dept === dept) : auditData;
    
    if (filteredData.length === 0) {
        showToast("❌ គ្មានទិន្នន័យសម្រាប់ផ្នែក: " + dept);
        return;
    }

    // Format data for Excel
    const excelData = filteredData.map(item => ({
        'ផ្នែក': item.dept,
        'បញ្ហា': item.problem,
        'ដំណោះស្រាយ': item.solution,
        'អ្នកទទួលខុសត្រូវ': item.pic,
        'ស្ថានភាព': item.status,
        'កាលបរិច្ឆេទ': item.date
    }));

    // Create workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Data");

    // Style the header
    const columnWidths = [15, 25, 25, 20, 15, 15];
    worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));

    // Generate file name
    const fileName = `Audit_${dept || 'All'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download
    XLSX.writeFile(workbook, fileName);
    showToast(`✅ បាននាំចេញ ${filteredData.length} ធាតុក្នុងឯកសារ Excel!`);
}

// ✅ លម្អិត Excel ទាំងអស់
function exportToExcelAll() {
    exportToExcelByDept(null);
}
