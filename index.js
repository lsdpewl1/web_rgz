const CURRENCY_CODE={
    EURRUB:'EURRUB',
    EURUSD:'EURUSD',
    EURGBP:'EURGBP',
    EURJPY:'EURJPY',
    EURKZT:'EURKZT',
    EURAED:'EURAED',
    EURBYN:'EURBYN',
    USDRUB:'USDRUB',
    USDGBP:'USDGBP',
    USDJPY:'USDJPY',
    USDKZT:'USDKZT',
    USDKGS:'USDKGS',
    USDAED:'USDAED',
    USDUAH:'USDUAH',
    USDTHB:'USDTHB',
    USDBYN:'USDBYN',
    GBPRUB:'GBPRUB',
    GBPJPY:'GBPJPY',
    GBPAUD:'GBPAUD',
    JPYRUB:'JPYRUB',
    RUBKZT:'RUBKZT',
    RUBAED:'RUBAED',
    BYNRUB:'BYNRUB',
    CNYRUB:'CNYRUB',
    CNYUSD:'CNYUSD',
    CNYEUR:'CNYEUR',
    BTCRUB:'BTCRUB',
    BTCUSD:'BTCUSD',
    BTCEUR:'BTCEUR',
    BTCGBP:'BTCGBP',
    BTCJPY:'BTCJPY',
    BTCBCH:'BTCBCH',
    BTCXRP:'BTCXRP',
    BCHUSD:'BCHUSD',
    BCHRUB:'BCHRUB',
    BCHGBP:'BCHGBP',
    BCHEUR:'BCHEUR',
    BCHJPY:'BCHJPY',
    BCHXRP:'BCHXRP',
    XRPUSD:'XRPUSD',
    XRPRUB:'XRPRUB',
    XRPGBP:'XRPGBP',
    XRPEUR:'XRPEUR',
    XRPJPY:'XRPJPY',
    GELUSD:'GELUSD',
    GELRUB:'GELRUB',
    THBEUR:'THBEUR',
    THBRUB:'THBRUB',
    BTGUSD:'BTGUSD',
    ETHUSD:'ETHUSD',
    ZECUSD:'ZECUSD',
    USDVND:'USDVND',
    USDMYR:'USDMYR',
    RUBAUD:'RUBAUD',
    THBCNY:'THBCNY',
    JPYAMD:'JPYAMD',
    JPYAZN:'JPYAZN',
    IDRUSD:'IDRUSD',
    EURTRY:'EURTRY',
    USDAMD:'USDAMD',
    USDILS:'USDILS',
    RUBNZD:'RUBNZD',
    RUBTRY:'RUBTRY',
    RUBSGD:'RUBSGD',
    RUBUAH:'RUBUAH',
    CADRUB:'CADRUB',
    CHFRUB:'CHFRUB',
    USDAUD:'USDAUD',
    USDCAD:'USDCAD',
    EURAMD:'EURAMD',
    EURBGN:'EURBGN',
    USDBGN:'USDBGN',
    GBPBYN:'GBPBYN',
    RUBAMD:'RUBAMD',
    RUBBGN:'RUBBGN',
    RUBMYR:'RUBMYR',
    MDLEUR:'MDLEUR',
    MDLRUB:'MDLRUB',
    MDLUSD:'MDLUSD',
    ETHRUB:'ETHRUB',
    ETHEUR:'ETHEUR',
    ETHGBP:'ETHGBP',
    ETHJPY:'ETHJPY',
    RSDRUB:'RSDRUB',
    RSDEUR:'RSDEUR',
    RSDUSD:'RSDUSD',
    LKRRUB:'LKRRUB',
    LKRUSD:'LKRUSD',
    LKREUR:'LKREUR',
    MMKRUB:'MMKRUB',
    MMKUSD:'MMKUSD',
    MMKEUR:'MMKEUR',
};

const getToday = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
}

const renderContent = (response) => {
    const {data} = response;
    let content = document.getElementById('data').innerHTML;

    Object
        .keys(data.data)
        .map((currencyCode) => {
            content += `
                <tr>                                   
                    <td>${data.data[currencyCode]}</td>
                <tr/>         
            `;               
        });

        document.getElementById('data').innerHTML = content;
}

document.getElementById('dateSelect').value = getToday();

axios
    .get(`https://currate.ru/api/?get=rates&pairs=${CURRENCY_CODE.EURRUB}&date=${document.getElementById('dateSelect').value}&key=3a8399579e8f6a2d09b3db024171f243`)
    .then(renderContent);

Object.keys(CURRENCY_CODE).forEach((currencyCode) => {
    const option = document.createElement('option');
    option.value = currencyCode;
    option.text = currencyCode;
    document.getElementById('currencySelect').appendChild(option);
});

document.getElementById('fetchButton').addEventListener('click', () => {
    const selectedCurrency = document.getElementById('currencySelect').value;
    document.getElementById('data').innerHTML = '';
    axios
        .get(`https://currate.ru/api/?get=rates&pairs=${selectedCurrency}&date=${document.getElementById('dateSelect').value}&key=3a8399579e8f6a2d09b3db024171f243`)
        .then(renderContent);
});