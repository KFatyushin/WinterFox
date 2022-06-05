//= ../../../node_modules/swiper/swiper-bundle.js

// Advantage Slides
let advantageSlides = new Swiper('.advantage-slides__container', {
    slidesPerView: 1,
    spaceBetween: 60,
    speed: 600,

    pagination: {
        el: '.advantage-pagination',
    },

    navigation: {
        prevEl: '.advantages-arrows .slides-arrows__prev',
        nextEl: '.advantages-arrows .slides-arrows__next',
    },
});

// Tabs Buy Crypto
jQuery('.buy-crypto-btns__item').on('click', function () {
    let currTab = jQuery(this).index();

    jQuery('.buy-crypto-btns__item').removeClass('active');
    jQuery(this).addClass('active');

    jQuery('.buy-crypto-content__item').removeClass('active');
    jQuery('.buy-crypto-content__item').eq(currTab).addClass('active');
});

// MENU
jQuery('.hamburger').on('click', function () {
    jQuery(this).toggleClass('open');
    jQuery('.header-menu').toggleClass('active');
});
jQuery('.menu li a').on('click', function () {
    jQuery('.hamburger').toggleClass('open');
    jQuery('.header-menu').toggleClass('active');
});

// POPUP
var popup = (object, open) => {
    open.on('click', function (evt) {
        evt.preventDefault();

        object.addClass('active');
    });

    jQuery('.popup-form__close').on('click', function () {
        object.removeClass('active');
    });
    jQuery('.popup__overlay').on('click', function () {
        object.removeClass('active');
    });
};
let introBTN = jQuery('.intro-calculator__btn'),
    popupCalcForm = jQuery('.popup'),
    applicationBTN = jQuery('#application-btn');
popup(popupCalcForm, introBTN);
popup(popupCalcForm, applicationBTN);

// CALCULATOR
/*let btcUsd = Number(jQuery('.quotes-crypto').attr('data-btc-usd')).toFixed(2),
    btcRub = Number(jQuery('.quotes-crypto').attr('data-btc-rub')).toFixed(2),
    ethUsd = Number(jQuery('.quotes-crypto').attr('data-eth-usd')).toFixed(2),
    ethRub = Number(jQuery('.quotes-crypto').attr('data-eth-rub')).toFixed(2),
    usdtUsd = Number(jQuery('.quotes-crypto').attr('data-usdt-usd')).toFixed(2),
    usdtRub = Number(jQuery('.quotes-crypto').attr('data-usdt-rub')).toFixed(2);*/
let btcUsd = Number(jQuery('#ccpw-list-widget-11 #bitcoin .price-value')[0].innerText.slice(1).replace(/,/g , '')),
    ethUsd = Number(jQuery('#ccpw-list-widget-11 #ethereum .price-value')[0].innerText.slice(1).replace(/,/g , '')),
    usdtUsd = Number(jQuery('#ccpw-list-widget-11 #tether .price-value')[0].innerText.slice(1).replace(/,/g , '')),
    btcRub = Number(jQuery('#ccpw-list-widget-12 #bitcoin .price-value')[0].innerText.slice(1).replace(/,/g , '')),
    ethRub = Number(jQuery('#ccpw-list-widget-12 #ethereum .price-value')[0].innerText.slice(1).replace(/,/g , '')),
    usdtRub = Number(jQuery('#ccpw-list-widget-12 #tether .price-value')[0].innerText.slice(1).replace(/,/g , ''));
/*console.log(btcUsd);
console.log(btcRub);
console.log(ethUsd);
console.log(ethRub);
console.log(usdtUsd);
console.log(usdtRub);*/

// percent
let percentBuy = Number(jQuery('#data-buy-percent').attr('data-percent'));
let percentSell = Number(jQuery('#data-sell-percent').attr('data-percent'));
let percent = 1 - percentBuy / 100;

jQuery('.intro-calculator__val').html(btcUsd);

// FORM DATA
let swap = jQuery('.calc-swap')[0].outerText,
    formCrypto = jQuery('.calculator-select__title')[0].innerText,
    formCurr = jQuery('.calculator-currency__title')[0].innerText,
    formWell = jQuery('.intro-calculator__val')[0].innerText;

if (swap === 'Купить') {
    jQuery('#calc-form-swap').val('Покупка');
}
if (formCrypto) {
    jQuery('#calc-form-crypto').val(formCrypto);
}
if (formCurr) {
    jQuery('#calc-form-curr').val(formCurr);
}
if (formWell) {
    jQuery('#calc-form-well').val(formWell);
}

jQuery('#application-name').keyup(function () {
    let text = jQuery(this).val();
    jQuery('#calc-form-name').val(text);
});
jQuery('#application-contact').keyup(function () {
    let text = jQuery(this).val();
    jQuery('#calc-form-contact').val(text);
});

// CALC
let calculateTotal = () => {
    let sum = jQuery('.calculator-value__input').val();
    jQuery('.calculator-value__input').val(sum);
    let val = Number(jQuery('.intro-calculator__val')[0].innerText);

    sum *= percent;
    let numBuy = sum / val;
    let numSell = (sum * val).toFixed(2);

    let cryptoVal = jQuery('.calculator-select-list__input:checked').val();

    if (cryptoVal === 'Tether') {
        numBuy = numBuy.toFixed(2);
    } else  {
        numBuy = numBuy.toFixed(5);
    }

    if (sum) {
        jQuery('.calculator__total-buy').html(numBuy);
        jQuery('.calculator__total-sell').html(numSell);

        jQuery('#calc-form-sum').val(sum);

        if (numBuy) {
            jQuery('#calc-form-sum').val(sum);
            jQuery('#calc-form-num').val(numBuy);
        } else if (numSell) {
            jQuery('#calc-form-sum').val(numSell);
            jQuery('#calc-form-num').val(sum);
        }
    } else {
        jQuery('.calculator__total-buy').html(0);
        jQuery('.calculator__total-sell').html(0);
    }
};

// BUY AND SELL
jQuery('.calculator__choose').on('click', function () {
    jQuery('.sell').toggleClass('active');
    jQuery('.buy').toggleClass('active');
    jQuery('.application__bottom').toggleClass('active');

    swap = jQuery('.calc-swap')[0].outerText;

    let totalBuy = jQuery('.calculator__total-buy')[0].innerText,
        totalSel  = jQuery('.calculator__total-sell')[0].innerText,
        sum = jQuery('.calculator-value__input').val();

    if (swap === 'Купить' || swap === 'Buy') {
        jQuery('#calc-form-swap').val('Покупка');

        jQuery('#calc-form-num').val(totalBuy);
        jQuery('#calc-form-sum').val(sum);

        calculateTotal();

    } else if (swap === 'Продать' || swap === 'Sell') {
        jQuery('#calc-form-swap').val('Продажа');

        jQuery('#calc-form-num').val(sum);
        jQuery('#calc-form-sum').val(totalSel);

        calculateTotal();
    }
});

// SELECT CRYPTO
let openSelect = (btn, list, parent = '') => {
    btn.on('click', function () {
        jQuery(this).parent().toggleClass('open');

        jQuery(this).siblings(list).slideToggle('');
    });
};

// close select
let closeSelect = (btn, list, parent = '') => {
    jQuery(document).mouseup(function (e) {
        let container = btn.parent();

        let classSel = container[0].className.indexOf('open'),
            openSel = (classSel !== -1) ? 1 : 0;

        if (container.has(e.target).length === 0 && openSel){
            btn.parent().toggleClass('open');

            btn.siblings(list).slideToggle('');
        }
    });
};

// Toggle Selection
let toggleSelection = (itemID, list) => {
    let currHeadNum = 1;

    for (let i = 1; currHeadNum === 1; i++) {
        let selectsItem = jQuery(itemID + i);
        if (selectsItem.length) {
            openSelect(selectsItem, list);
            closeSelect(selectsItem, list);
        } else {
            currHeadNum = 0;
        }
    }
};

// Crypto Data
let cryptoData = {
    'Bitcoin' : [
        'BTC',
        {
            'USD' : btcUsd,
            'RUB' : btcRub
        }
    ],

    'Ethereum' : [
        'ETH',
        {
            'USD' : ethUsd,
            'RUB' : ethRub
        }
    ],

    'Tether' : [
        'USDT',
        {
            'USD' : usdtUsd,
            'RUB' : usdtRub
        }
    ]
};

// Toggle Ticker
let toggleTicker = (item, arr) => {
    for (let key in arr) {
        if (item === key) {
            jQuery('.calculator-cryptocurrency').html(arr[key][0]);

            jQuery(".calculator-select__img img").attr('src','/wp-content/themes/winterfox/assets/img/' + arr[key][0] + '.svg');
        }
    }
};

// Change Pair
let changePair = (item, currVal, arr) => {
    for (let key in arr) {
        let arrVal = arr[key][1];

        for (let curr in arrVal) {
            if (item === key && currVal === curr) {
                jQuery('.intro-calculator__val').html(arrVal[curr]);
            }
        }
    }
};

// select calc
toggleSelection('#calculator-select-head-', jQuery('.calculator-select-list'));

// Select Crupto List
jQuery('.calculator-select-list__label').on('click', function () {
    let text = jQuery(this).find(jQuery('input')).val();
    let currVal = jQuery('.calculator-currency__input:checked').val();
    jQuery('.calculator-select__title').html(text);

    toggleTicker(text, cryptoData);

    changePair(text, currVal, cryptoData);

    // form data
    if (text) {
        jQuery('#calc-form-crypto').val(text);
    }
    // form data well
    formWell = jQuery('.intro-calculator__val')[0].innerText;
    if (formWell) {
        jQuery('#calc-form-well').val(formWell);
    }

    calculateTotal();
});

// SELECT CURRENCY
toggleSelection('#curr-head-', jQuery('.calculator-currency__list'));

jQuery('.calculator-currency__label').on('click', function () {
    let text = jQuery(this).find(jQuery('input')).val();
    jQuery('.calculator-currency__title').html(text);
    jQuery('.calculator-quotation-currency').html(text);

    let cryptoVal = jQuery('.calculator-select-list__input:checked').val();
    let currVal = jQuery('.calculator-currency__input:checked').val();

    changePair(cryptoVal, currVal, cryptoData);

    // form data
    if (currVal) {
        jQuery('#calc-form-curr').val(currVal);
    }
    // form data well
    formWell = jQuery('.intro-calculator__val')[0].innerText;
    if (formWell) {
        jQuery('#calc-form-well').val(formWell);
    }

    calculateTotal();
});

// CALC
jQuery('.calculator-value__input').keyup(function () {
    calculateTotal();
}).keyup();

// MAP
ymaps.ready(function() {
    var contactMap = new ymaps.Map("contact-map", {
            center: [59.437514, 24.572315],
            zoom: 16,
        }),
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #fff; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        zhkPlacemark = new ymaps.Placemark([59.437514, 24.572315], {
            hintContent: 'г. Москва Пресненская набережная, 12',
            // balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/wp-content/themes/winterfox/assets/img/mark.svg',
            // Размеры метки.
            iconImageSize: [35, 35],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -28],
            // Поиск по организациям.
            searchControlProvider: 'yandex#search'
        });
    contactMap.geoObjects
        .add(zhkPlacemark);
    //отключаем зум колёсиком мышки
    contactMap.behaviors.disable('scrollZoom');
    //на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //... отключаем перетаскивание карты
        contactMap.behaviors.disable('drag');
    }

    window.onresize = function(event) {
        mapCenter();
    };
});