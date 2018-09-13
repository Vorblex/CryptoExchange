export default function() {
  
  return class Card {
    constructor(item) {
      this.url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
      this.type = item.data('type');
      this.control = item.find('.checkbox__toggle');
      this.price = item.find('.coins__price-value');
      this.hour = item.find('.hourch');
      this.day = item.find('.daych');
      this.week = item.find('.weekch');
      this.month = item.find('.monthch');
      this.data = {};
    }
  
  
    render(data, currencyType) {
      let
        {...price} = data.changes.price,
        {...percent} = data.changes.percent,
        sign = '',
        result = {},
        current = {};
  
      switch(currencyType) {
      case 'RUB':
        currency = '&#8381;';
        break;
            
      case 'EUR':
        currency = '€';
        break;
  
      case 'GBP':
        currency = '&#163;';
        break;
            
      default:
        currency = '$';
        break;
      }
  
      if(this.control.prop('checked')) {
        current = percent;
        sign = '%';
      } else {
        current = price;
        sign = currency;
      }
  
      let {hour, day, week, month} = current;
  
      current = {
        hour, day, week, month
      };
  
      let process = (data) => {
        for(let key in data) {
          result[key] = Math.round(data[key]) + sign;
          if(+data[key] < 0) {
            this[key].addClass('danger');
          }
        }
      };
  
      process(current, currencyType);
      
      this.control.off('change');
      this.control.on('change', () => {
        this.render(data, currencyType);
      });
  
      this.price.html(currency + Math.round(data.last * 100)  / 100); 
      this.hour.html(result.hour);
      this.day.html(result.day);
      this.week.html(result.week); 
      this.month.html( result.month );
  
    }
  
    getData(currency = 'USD') {
      let url = `${this.url}${this.type}${currency}`;
      this.sendAjax(url)
        .then((data)=> {
          this.render(data, currency);
        });
    }
  
    sendAjax(url) {
      return new Promise((resolve, reject) => {
          
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          resolve(xhr.response);
        });
        xhr.addEventListener('error', () => {
          reject();
        });
        xhr.send();
      });
    } 
  };

}