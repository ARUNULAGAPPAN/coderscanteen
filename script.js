const menuItems = [
    { name: "Dosai", price: 30.00 },
    { name: "Parota", price: 10.00 },
    { name: "Idly", price: 5.00 },
    { name: "Maggi", price: 25.00 },
    { name: "Poori", price: 15.00 },
    { name: "Milk", price: 10.00 },
    { name: "Boost", price: 15.00 }
];

const studentDatabase = {
    "2023503001": "Joice gloria",
    "2023503005": "Dharshith kumarsenthilkumar",
    "2023503016": "Arun Ulagappan S",
    "2023503034": "Naveen kumar",
    "2023503002": "Niranjan",
    "2023503027": "Sibi chakaravarthi",
    "2023503047": "Srivandhi",
    "2023503069": "chirra sahithi",
    "2023503516": "Priya Dharshini",
    "2023503563": "Dakshina Sundari",
    "2023503548": "Syndhavi",
    "2023503039": "Sivasankari",
    "2023503028": "Abishree",
    "2023503030": "Anusha",
    "2023503038": "Aparnaa",
    "2023503008": "Karthickram",
    "2023503550": "Vedhavalli",
    "2023503528": "Shivaranjane",
    "2023503576": "Natasha asmi",
    "2023503524": "Manju shree",
    "2023503526": "Lathikasaran",
    "2023503575": "Keerthana Ganesh babu",
    "2023503518": "Arunmozhi",
    "2023503009": "Prethivraj",
    "2023503018": "Nareindra rrasath",
    "2023503035": "Preethi",
    "2023503056": "Anstish sahana",
    "2023503501": "Subhashini",
    "2023503627": "Dhivya Dharshini",
    "2023503531": "Akshayaa veena",
    "2023503553": "Raveena",
    "2023503565": "Logeshwari",
    "2023503584": "Elizabeth Ann Joseph",
    "2023503511": "Dusika",
    "2023503032": "Kaviya",
    "2023503004": "Ananya Priya",
    "2023503044": "Jenifa",
    "2023503054": "Pradesha",
    "2023503056": "Anstish sahana",
    "2023503552": "Dharshini Priya",
    "2023503574": "Saisanjeev",
    "2023503061": "Durai Singh",
    "2023503556": "Muhammed Musthafa",
    "2023503568": "Harini",
    "2023503522": "Karthick Raja",
    "2023503514": "Kishor",
    "2023503586": "Abirami",
    "2023503517": "Lavanya",
    "2023503565": "Logeshwari",
};

const orderList = document.getElementById('orderList');
const totalCostDisplay = document.getElementById('totalCost');
const printButton = document.getElementById('printBill');
let totalCost = 0;

// Display student ID and name
let studentData;
try {
    studentData = JSON.parse(localStorage.getItem('studentData'));
    if (!studentData || !studentDatabase[studentData.id]) {
        throw new Error("Invalid student data");
    }
    document.getElementById('studentIdDisplay').innerText = `Student ID: ${studentData.id}`;
    document.getElementById('studentNameDisplay').innerText = `Name: ${studentDatabase[studentData.id] || 'Unknown'}`;
} catch (error) {
    console.error(error);
    alert("Unable to retrieve student data.");
}

function updateOrder() {
    orderList.innerHTML = '';
    totalCost = 0;

    let hasItems = false;

    menuItems.forEach((item, index) => {
        const quantity = parseInt(document.getElementById(`quantity${index}`).value) || 0;
        if (quantity > 0) {
            hasItems = true;
            const cost = item.price * quantity;
            totalCost += cost;

            const orderItem = document.createElement('div');
            orderItem.innerHTML = `${item.name} x ${quantity} = ₹${cost.toFixed(2)}`;
            orderList.appendChild(orderItem);
        }
    });

    totalCostDisplay.innerText = totalCost.toFixed(2);
    return hasItems;
}

// Place Order button functionality
document.getElementById('placeOrder').addEventListener('click', () => {
    if (updateOrder()) {
        const billHTML = `
            <h2 style="text-align: center;">MIT CODERS</h2>
            <p style="text-align: center;">Welcome, ${studentDatabase[studentData.id] || 'Student'}!</p>
            <div style="margin: 20px 0;">${orderList.innerHTML}</div>
            <p style="text-align: center;"><strong>Total Cost: ₹${totalCost.toFixed(2)}</strong></p>
        `;

        orderList.innerHTML = billHTML;
        printButton.style.display = 'block'; // Show print button
        alert(`Your order has been placed! Total cost: ₹${totalCost.toFixed(2)}`);

        // Reset order
        totalCostDisplay.innerText = '0.00';
        menuItems.forEach((_, index) => {
            document.getElementById(`quantity${index}`).value = 0;
        });
    } else {
        alert('Please add items to your order before placing it.');
    }
});

// Print functionality
printButton.addEventListener('click', () => {
    const printContent = `
        <div style="text-align: center;">
            <h2>MIT CODERS</h2>
            <p>Welcome, ${studentDatabase[studentData.id] || 'Student'}!</p>
            <div>${orderList.innerHTML}</div>
            <p><strong>Total Cost: ₹${totalCost.toFixed(2)}</strong></p>
        </div>
    `;

    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write(`
        <html>
            <head>
                <title>Print Bill</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h2 { color: #e21d25; }
                </style>
            </head>
            <body>${printContent}</body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
});

// Event listeners for quantity inputs
menuItems.forEach((_, index) => {
    document.getElementById(`quantity${index}`).addEventListener('input', updateOrder);
});
