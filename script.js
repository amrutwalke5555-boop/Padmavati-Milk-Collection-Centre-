// Price calculation formula example: Amount = milkQty * (fat + snf)
function calculateAmount(milkQty, fat, snf) {
    return (milkQty * (fat + snf)).toFixed(2);
}

let totalMilk = 0;
let totalAmount = 0;

document.getElementById("milkForm").addEventListener("submit", function(e){
    e.preventDefault();

    const farmerName = document.getElementById("farmerName").value;
    const milkQty = parseFloat(document.getElementById("milkQty").value);
    const fat = parseFloat(document.getElementById("fat").value);
    const snf = parseFloat(document.getElementById("snf").value);
    const amount = parseFloat(calculateAmount(milkQty, fat, snf));

    // Add row to table
    const table = document.getElementById("milkTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = farmerName;
    newRow.insertCell(1).innerText = milkQty;
    newRow.insertCell(2).innerText = fat;
    newRow.insertCell(3).innerText = snf;
    newRow.insertCell(4).innerText = amount;

    // Update totals
    totalMilk += milkQty;
    totalAmount += amount;
    document.getElementById("totalMilk").innerText = totalMilk.toFixed(2);
    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);

    // Reset form
    this.reset();
});

// Export table to Excel
document.getElementById("exportBtn").addEventListener("click", function(){
    let table = document.getElementById("milkTable");
    let rows = Array.from(table.rows);
    let csvContent = rows.map(r => Array.from(r.cells).map(cell => cell.innerText).join(",")).join("\n");

    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "milk_records.csv");
    link.click();
});