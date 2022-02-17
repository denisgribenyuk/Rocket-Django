$(document).ready(function() {

    setTimeout(() => {
        $(".loader-container").fadeOut(300);
    }, 3000);

    $(".navigation").on("click", "#arrow-button", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    if (!localStorage.getItem('rocket-delivery')) {
        let initialStateLocalStorage = JSON.stringify([]);
        localStorage.setItem('rocket-delivery', initialStateLocalStorage)
    }

    $('.js-cart-counter').text((JSON.parse(localStorage.getItem('rocket-delivery'))).length)

    $('.menu__btn-add-to-cart').on('click', function(event) {
        event.preventDefault();
        let product_data = {prod_id: '', mod_id: '', mod_id_without_price: '',quantity: 1}
        product_data.prod_id = $(this).parents('.menu__item').attr('data-id')

        let order_item_is_ready = true
        if ($(this).parents('.menu__item').children('.menu__item-footer').children('.checkbox-group').length){
            const mod_id = $(this).parents('.menu__item')
            .children('.menu__item-footer')
            .children('.checkbox-group')
            .children('.menu__item-select')
            .children('.menu__item-select-name.active')
            .children('input').attr('data-id')
            if (mod_id){
                product_data.mod_id = mod_id
            } else {
                alert('Необходимо выбрать модификатор')
                order_item_is_ready = false
            }
        }
        if ($(this).parents('.menu__item').children('.menu__item-footer').children('.checkbox-group--without-price').length){
            const mod_id_without_price = $(this).parents('.menu__item')
            .children('.menu__item-footer')
            .children('.checkbox-group--without-price')
            .children('.menu__item-select')
            .children('.menu__item-select-name.active')
            .children('input').attr('data-id')
            if (mod_id_without_price){
                product_data.mod_id_without_price = mod_id_without_price
            } else {
                alert('Необходимо выбрать модификатор')
                order_item_is_ready = false
            }
        }

        if (order_item_is_ready) {
            // let itemName = $(this).parent('.menu__item').children('.menu__item-name').text().trim();
            //
            // try {itemName += `, Доп.: ${$(this).parents('.menu__item').children('.checkbox-group').children('.custom-checkbox-group').children('.variants-value-hidden-js').attr('data-val').trim()}`}
            // catch (e){}
            // try {itemName += `, Доп.: ${$(this).parents('.menu__item').children('.checkbox-group').children('.menu__item-select-additional').children('.variants-without-price-value-hidden-js').attr('data-val').trim()}`}
            // catch (e){}
            // let itemPrice = $(this).attr('data-price');
            // let itemID = $(this).attr('data-id');
            //
            // const itemForLocalStorage = { id: itemID, name: itemName, price: itemPrice, quantity: 1}
            const copyOfStorage = JSON.parse(localStorage.getItem('rocket-delivery'));

            let isPresentInStorage = 0;
            copyOfStorage.forEach(item => {
                if (item.prod_id == product_data.prod_id && item.mod_id == product_data.mod_id) {
                    item.quantity += 1
                    isPresentInStorage += 1
                }
            })

            if (isPresentInStorage === 0) {
                copyOfStorage.push(product_data);
            }


            // const uniqueArray = copyOfStorage.filter((thing, index) => {
            //     return index === copyOfStorage.findIndex(obj => {
            //         return JSON.stringify(obj) === JSON.stringify(thing);
            //     });
            // });

            localStorage.setItem('rocket-delivery', JSON.stringify(copyOfStorage))

            $('.js-cart-counter').text(JSON.parse(localStorage.getItem('rocket-delivery')).length)
            // $(this).attr('disabled', 'true')
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        autoplay: {
            delay: 15000,
        },


    });

    $('.js-burger').on('click', function(event) {
        event.preventDefault();
        $('.mobile-menu__navigation').show(300)
    });

    $('.js-close-menu, .mobile-menu__navigation-item').on('click', function(event) {
        $('.mobile-menu__navigation').hide(300)
    })

    // $('.select-diam-js').on('change', function (event) {
    //     const price = ($(this).val()).split('-')[1]
    //     $(this).parents('.menu__item').children('.menu__item-price').text(price)
    //     $(this).parents('.menu__item').children('.menu__btn-add-to-cart').attr('data-price', price.split(' ')[1])
    // })

    // document.querySelectorAll('.variants-value-hidden-js').forEach(element => {
    //     element.setAttribute('data-val', element.closest('.menu__item-select').querySelector('.active').querySelector('.radio__text').textContent)
    // })
    // document.querySelectorAll('.variants-without-price-value-hidden-js').forEach(element => {
    //     element.setAttribute('data-val', element.closest('.menu__item-select-additional').querySelector('.active').querySelector('.radio__text').textContent)
    // })


    $('.menu__item').children('.menu__item-select-name--variants').addClass('active')


    $(document).on('click', '.menu__item-select-name--variants', function () {
        $(this).parent('.menu__item-select').children('.menu__item-select-name').removeClass('active')
        $(this).toggleClass('active')
        // $(this).parents('.menu__item-select').children('.variants-value-hidden-js').attr('data-val',$(this).children('.radio__text').text())
        const price = $(this).children('[name="variant"]').attr('data-price')
        $(this).parents('.menu__item').children('.menu__item-footer').children('.menu__item-price').text(price + ' руб.')
        // $(this).parents('.menu__item').children('.menu__btn-add-to-cart').attr('data-price', price.split(' ')[0])
    });
    $(document).on('click', '.menu__item-select-name--variants-without-price', function () {
        $(this).parent('.menu__item-select').children('.menu__item-select-name').removeClass('active')
        $(this).toggleClass('active')
        // $(this).parents('.menu__item-select').children('.variants-value-hidden-js').attr('data-val',$(this).children('.radio__text').text())
        // const price = $(this).children('[name="variant"]').attr('data-price')
        // $(this).parents('.menu__item').children('.menu__btn-add-to-cart').attr('data-price', price.split(' ')[0])
    });
    // $(document).on('click', '.menu__item-select-name--variants-without-price', function () {
    //     $(this).parent('.menu__item-select').children('.menu__item-select-name').removeClass('active')
    //     $(this).toggleClass('active')
    //     $(this).parents('.menu__item-select').children('.variants-without-price-value-hidden-js').attr('data-val',$(this).children('.radio__text').text().trim())
    // });


    // function compareTime() {
    //     let timeNow = new Date();
    //     timeNow = timeNow.toLocaleTimeString();
    //     let startWorkTime = `${document.querySelector('.work-start-time').textContent}:00`;
    //     let endWorkTime = `${document.querySelector('.work-end-time').textContent}:00`;
    //     if (timeNow < startWorkTime && timeNow > endWorkTime) {
    //         return false;
    //     }
    //     return true;
    // }
    //
    // if (compareTime() == false) {
    //     setTimeout(() => {
    //         $(".alert-wt").fadeIn(600);
    //         $("html,body").css("overflow", "hidden");
    //         $("body").addClass("fixed");
    //     }, 3500);
    //     $(".alert-wt__confirm").on('click', function(event) {
    //         event.preventDefault();
    //         $(".alert-wt").fadeOut(500);
    //         $("html,body").css("overflow", "visible");
    //         $("body").removeClass("fixed");
    //     });
    //     $('.cart-button').on('click', function(event) {
    //         event.preventDefault();
    //         $('.alert-wt__text').text('Кнопка корзины доступна только в рабочее время!')
    //         $(".alert-wt").fadeIn(600);
    //         $("html,body").css("overflow", "hidden");
    //         $("body").addClass("fixed");
    //     })
    // }



})