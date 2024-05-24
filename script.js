//Total Revenue By Tax Class
const chart4 = document.getElementById("mychart_4");

//TOP 10 TOTAL REVENUE AND TRANSACTION BY NEIGHBORHOOD CHART
const chart6 = document.getElementById("megachart");

fetch("File Json/Total_revenue_transaction_neighborhood.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalSales = [];
    var arrTotalTransaction = [];
    var arrNeighborhood = [];
    data.forEach((element) => {
      arrTotalSales.push(element.TOTAL_SALES);
      arrTotalTransaction.push(element.TOTAL_TRANSACTIONS);
      arrNeighborhood.push(element.NEIGHBORHOOD);
    });
    console.log(arrTotalSales);
    console.log(arrTotalTransaction);
    var objChart = {
      total_sales: arrTotalSales,
      total_transaction: arrTotalTransaction,
      neighborhood: arrNeighborhood,
    };
    console.log(objChart);
    createChart(objChart, "bar");
  });

fetch("File Json/Total_Revenue_by_Tax_Class.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalRevenue = [];
    var arrTaxClass = [];
    data.forEach((element) => {
      arrTotalRevenue.push(element.TOTAL_REVENUE);
      arrTaxClass.push(element.TAX_CLASS);
    });
    console.log(arrTaxClass);
    console.log(arrTotalRevenue);
    var objChart = {
      tax_class: arrTaxClass,
      total_revenue: arrTotalRevenue,
    };
    console.log(objChart);
    createChart2(objChart, "bar");
  });

function createChart(arrPassed, type) {
  new Chart(chart6, {
    type: type,
    data: {
      labels: arrPassed.neighborhood,
      datasets: [
        {
          label: "Total Sales",
          data: arrPassed.total_sales,
          borderWidth: 1,
          yAxisID: "sales",
        },
        {
          label: "Transactions",
          data: arrPassed.total_transaction,
          borderWidth: 1,
          yAxisID: "transaction",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "TOP 10 TOTAL REVENUE & TRANSACTION BY NEIGHBORHOOD",
        },
      },
      layout: {
        padding: {},
      },
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },
        sales: {
          type: "linear",
          position: "left",
          min: 0,
          max: 400000000,
          title: {
            display: true,
            text: "Total Sales",
          },
        },
        transaction: {
          type: "linear",
          position: "right",
          min: 0,
          max: 1000,
          display: true,
          title: {
            display: true,
            text: "Total Transactions",
          },
        },
      },
    },
  });
}

function createChart2(arrPassed2, type) {
  new Chart(chart4, {
    type: type,
    data: {
      labels: arrPassed2.tax_class,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed2.total_revenue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "TOTAL REVENUE BY TAX CLASS",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Quarterly Sales Revenue and Transactions Chart
function createQuarterlySalesChart() {
  fetch("File Json/Quarterly_Sales_revenue.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      var arrRevenue = [];
      var arrQuarters = [];
      var arrTransactions = [];

      data.forEach((element) => {
        arrRevenue.push(element.TOTAL_REVENUE);
        arrTransactions.push(element.TOTAL_TRANSACTIONS);
        arrQuarters.push(
          `Q${element.EXTRACTED_QUARTER} ${element.EXTRACTED_YEAR}`
        );
      });

      var objChart = {
        total_revenue: arrRevenue,
        quarters: arrQuarters,
        total_transactions: arrTransactions,
      };

      createQuarterlyChart(objChart, "line"); // Tipe chart sekarang adalah 'line'
    })
    .catch(function (error) {
      console.error("Error during fetch operation:", error);
    });
}

function createQuarterlyChart(arrPassed, type) {
  const ctx = document.getElementById("mychart_1");
  new Chart(ctx, {
    type: type, // Sekarang adalah grafik garis
    data: {
      labels: arrPassed.quarters,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed.total_revenue,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 1,
          fill: false, // Pastikan area di bawah garis tidak diisi
          tension: 0.4, // Menambahkan kelengkungan pada garis
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Quarterly Sales Revenue",
        },
      tooltip: {
        callbacks : { 
          label: function (context){
            let label = 'Total Revenue: '+ context.raw ||'';
            let index = context.dataIndex;
            let totalTransactions = arrPassed.total_transactions[index];
            return [label, 'Total Transactions: '+ totalTransactions];
          }
        }
      }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1400000000, // Atur nilai maksimal untuk pendapatan
          title: {
            display: true,
            text: "Total Revenue (in USD)",
          },
        },
      },
      responsive: true,
    },
  });
}

// Memulai proses pembuatan grafik
createQuarterlySalesChart();

//Total Revenue By Building Category
const chart5 = document.getElementById("megachart_2");

fetch("File Json/Total_Revenue_building_Category.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalRevenue = [];
    var arrBuildingClassCategory = [];
    var arrRevenuePercentage = [];
    data.forEach((element) => {
      arrTotalRevenue.push(element.Total_Revenue);
      arrBuildingClassCategory.push(element.BUILDING_CLASS_CATEGORY);
      arrRevenuePercentage.push(element.Revenue_Percentage);
    });
    console.log(arrBuildingClassCategory);
    console.log(arrTotalRevenue);
    console.log(arrRevenuePercentage);
    var objChart = {
      building_class_category: arrBuildingClassCategory,
      total_revenue: arrTotalRevenue,
      revenue_percentage: arrRevenuePercentage,
    };
    console.log(objChart);
    createChart5(objChart, "bar");
  });

function createChart5(arrPassed5, type) {
  new Chart(chart5, {
    type: "bar",
    data: {
      labels: arrPassed5.building_class_category,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed5.total_revenue,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          type: "logarithmic",
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Total Revenue By Building Category",
        },
      },
    },
  });
}

//MONTHLY AVERAGE REVENUE
const chart2 = document.getElementById("mychart_2");

fetch("File Json/Monthly_Average_Revenue.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrYearMonth = [];
    var arrAverageSalePrice = [];
    data.forEach((element) => {
      arrYearMonth.push(element.YEAR_MONTH);
      arrAverageSalePrice.push(element.AVERAGE_SALE_PRICE);
    });
    console.log(arrYearMonth);
    console.log(arrAverageSalePrice);
    var objChart = {
      YEAR_MONTH: arrYearMonth,
      AVERAGE_SALE_PRICE: arrAverageSalePrice,
    };
    console.log(objChart);
    createChart7(objChart, "line");
  });

function createChart7(arrLine3, type) {
  new Chart(chart2, {
    type: type,
    data: {
      labels: arrLine3.YEAR_MONTH,
      datasets: [
        {
          label: "Monthly_Average_Revenue",
          data: arrLine3.AVERAGE_SALE_PRICE,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "MONTHLY AVERAGE REVENUE",
        },
      },
      scales: {
        y: {
          display: true,
          ticks: {
            beginAtZero: true,
            max: 800000,
            min: 500000,
          },
        },
      },
    },
  });
}

// SALES COMPOSITION
const ctx = document.getElementById("mychart_3");

fetch("File Json/Sales_Composition_building_classification (1).json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrBuildingClass = [];
    var arrTotalRevenue = [];
    data.forEach((element) => {
      arrTotalRevenue.push(element.TOTAL_REVENUE);
      arrBuildingClass.push(element.BUILDING_CLASS);
    });
    console.log(arrBuildingClass);
    console.log(arrTotalRevenue);
    var objChart = {
      total_revenue: arrTotalRevenue,
      building_class: arrBuildingClass,
    };
    console.log(objChart);
    createChart3(objChart, "pie");
  });

function createChart3(arrPassed, type) {
  new Chart(ctx, {
    type: type,
    data: {
      labels: arrPassed.building_class,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed.total_revenue,
          backgroundColor: [
            "rgb(285, 109, 132)",
            "rgb(89, 89, 119)",
            "rgb(169, 76, 119)",
            "rgb(17, 78, 117)",
            "rgb(241, 186, 124)",
          ],
          hoverOffset: 5,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "SALES COMPOSITION BUILDING CLASSIFICATION",
        },
        legend: {
          position: "right",
        },
      },
    },
  });
}

// Quarter Total (Sales Transaction)
// const chart7 = document.getElementById('megachart');

// fetch('File Json/Quarter_Total_Transaction.json')
// .then(function(response) {

//     if(response.ok == true){
//         return response.json();
//     }
// })
// .then(function(data){
//     console.log(data);
   
//     var arrQuarterYear = [];
//     var arrTotalSales = [];
//     data.forEach(element => {
//       arrQuarterYear.push(`Q${element.EXTRACTED_QUARTER} ${element.EXTRACTED_YEAR}`);
//       arrTotalSales.push(element.TOTAL_SALES);
//     });
//     console.log(arrQuarterYear);
//     console.log(arrTotalSales);
//     var objChart = {
//       quarter_year: arrQuarterYear,
//       total_sales: arrTotalSales,
//     };
//     console.log(objChart);
//     createChart8(objChart, 'line');
// })

// function createChart8(arrLine, type){

//   new Chart(chart7, {
//     type: type,
//     data: {
//       labels: arrLine.quarter_year,
//       datasets: [{
//         label: 'Transaction',
//         data: arrLine.total_sales,
//         borderWidth: 1,
//         fill: false,
//         tension: 0.4,
//         yAxisID : "Sales"
//       },
//     ]
//     },
//     options: {
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Quarter Total Transaction'

//             }
//         },
//       scales: {
//         y: {
//           beginAtZero: true, 
//           display: false
//         },
//         Sales: {
//             axis: 'y',
//             min: 0,
//             max: 2000
//         }
//       }
//     }
//   });
// }
