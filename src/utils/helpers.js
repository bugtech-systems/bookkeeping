export function sortByType(arr) {
    const typeOrder = {
        Asset: 1,
        Liability: 2,
        Equity: 3,
        Revenue: 4,
        Expense: 5,
    };

    arr.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    return arr;
}

export function capitalizeFirstLetter(str) {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatCurrency(num) {
    let number = num
    // Check if the provided value is a valid number
    if (typeof number !== 'number') {
        number = 0;
    }

    // Use toLocaleString to format the number as currency
    const formattedCurrency = number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'Php', // Change to your desired currency code
        minimumFractionDigits: 0,
    });

    return formattedCurrency;
}