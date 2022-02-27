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

    $('.menu__item').children('.menu__item-footer').children('.menu__btn-add-to-cart').on('click', function(event) {
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
            .children('.variants-value-hidden-js').attr('data-id')
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


    function compareTime() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let startWorkTime = new Date(Date.parse(`${date} ${document.querySelector('.js-work-start-time').textContent}:00`));
        let endWorkTime = new Date(Date.parse(`${date} ${document.querySelector('.js-work-end-time').textContent}:00`));

        return !(today < startWorkTime || today > endWorkTime);

    }

    if (compareTime() == false) {
        setTimeout(() => {
            $(".alert-wt").fadeIn(600);
            $("html,body").css("overflow", "hidden");
            $("body").addClass("fixed");
        }, 3500);
        $(".alert-wt__confirm").on('click', function(event) {
            event.preventDefault();
            $(".alert-wt").fadeOut(500);
            $("html,body").css("overflow", "visible");
            $("body").removeClass("fixed");
        })
    }



    // Логика добавления в корзину мобильной версии
    $('.menu__btn-price--mobile').on('click', function (event){
        let pop_up = $(this).parents('.menu__item--mobile').children('.menu__item-popup')
        pop_up.fadeIn(200)
        pop_up.css('display', 'flex')
        pop_up.children('.menu__item-popup-close').on('click', function (){
            pop_up.fadeOut(200)
        })


        pop_up.children('.checkbox-group').children('.menu__item-select').children('.menu__item-select-name--variants').on('click',  function () {
            console.log($(this))
            $(this).parents('.menu__item-select').children('.menu__item-select-name').removeClass('active')
            $(this).toggleClass('active')
            const price = $(this).children('[name="variant"]').attr('data-price')
            $(this).parents('.menu__item-popup').children('.menu__item-price').text(price + ' руб.')
        });
        pop_up.children('.checkbox-group').children('.menu__item-select').children('.menu__item-select-name--variants-without-price').on('click',  function () {
            $(this).parent('.menu__item-select').children('.menu__item-select-name').removeClass('active')
            $(this).toggleClass('active')
        });


        pop_up.children('.menu__btn-add-to-cart').on('click', function(event) {
            event.preventDefault();
            let product_data = {prod_id: '', mod_id: '', mod_id_without_price: '',quantity: 1}
            product_data.prod_id = $(this).parents('.menu__item-popup').attr('data-id')

            let order_item_is_ready = true
            if ($(this).parents('.menu__item-popup').children('.checkbox-group').length){
                const mod_id = $(this).parents('.menu__item-popup')
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
            if ($(this).parents('.menu__item-popup').children('.checkbox-group--without-price').length){
                const mod_id_without_price = $(this).parents('.menu__item-popup')
                .children('.checkbox-group--without-price')
                .children('.variants-value-hidden-js').attr('data-id')
                if (mod_id_without_price){
                    product_data.mod_id_without_price = mod_id_without_price
                } else {
                    alert('Необходимо выбрать модификатор')
                    order_item_is_ready = false
                }
            }

            if (order_item_is_ready) {
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

                localStorage.setItem('rocket-delivery', JSON.stringify(copyOfStorage))
                $('.js-cart-counter').text(JSON.parse(localStorage.getItem('rocket-delivery')).length)
                $(this).css('background-color', '#7cb742d6')
            }
        });
    })

    $('.dropdown-select').on('change', function (event){
        $(this).parents('.checkbox-group--without-price').children('.variants-value-hidden-js').attr('data-id', $(this).val())
    })
    // $('.js-cart-btn').on('click', function (event){
    //     event.preventDefault()
    //     fetch('./cart/', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         'X-CSRFToken': window.CSRF_TOKEN
    //     },
    //     body: localStorage.getItem('rocket-delivery')
    //     }).then((content)=>{console.log(content)})
    //
    //
    // })

})