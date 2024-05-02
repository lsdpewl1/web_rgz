const CURRENCY_CODE={
    USDRUB:'USDRUB',
    EURRUB:'EURRUB',
    RUBUSD:'RUBUSD',
    RUBEUR:'RUBEUR',
};

const CURRENCY={
EUR: "EUR",
RUB: "RUB",
USD: "USD"
};

const getToday = () => {
    const date = new Date();

    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
}

const renderContent = (response) => {
    const {data} = response;
    let content = document.getElementById('data').innerHTML;
    console.log(getToday());
    console.log(response.data);

    Object
        .keys(data.quotes)
        .map((currencyCode) => {
            content += `
                <tr>
                    
                    <td>${data.base}</td>
                    <td>${data.quotes[currencyCode]}</td>
                <tr/>
            
            `;
                
        });

        document.getElementById('data').innerHTML = content;
}


axios
    .get('https://api.apilayer.com/currency_data/historical', {
    params: {
        base: `EUR`,
        symbols: CURRENCY.RUB,
        date: getToday(),
    },
    headers: {
        'apikey': 'fwbue7rwhFOBfDAR68kGIAuh0nhH4pvS'
    }
    })
    // .get('https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP', {
    // headers: {
    //     'apikey': 'fwbue7rwhFOBfDAR68kGIAuh0nhH4pvS'
    // }
    // })
    // .get(`https://currate.ru/api/?get=rates&pairs=${CURRENCY_CODE.USDRUB},${CURRENCY_CODE.EURRUB}&date=2018-02-12&key=3a8399579e8f6a2d09b3db024171f243`)
    // .get(`https://currate.ru/api/?get=rates&pairs=${CURRENCY_CODE.USDRUB},${CURRENCY_CODE.EURRUB}&date=${getToday()}&key=3a8399579e8f6a2d09b3db024171f243`)
    .then(renderContent);