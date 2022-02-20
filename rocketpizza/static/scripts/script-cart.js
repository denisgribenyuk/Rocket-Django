$(document).ready(function() {


    $(function() {
        $("#phone").mask("8(999) 999-9999");
    });

    let itemsInLocalStorage;

    if (localStorage.getItem('rocket-delivery')) {
        itemsInLocalStorage = [...JSON.parse(localStorage.getItem('rocket-delivery'))];
    } else {
        itemsInLocalStorage = [];
    }


    function getSum() {
        let sumPrice = 0;
        $('.cart__price').toArray().forEach(element => {
            sumPrice += Number($(element).text())
        })


        // Сумма корзины, если есть какая-либо акция
        // const saleValue = 15
        // const minFreeDeliverySum = 600
        // if (sumPrice < 600) {
        //     $('.cart__sum').text(`Сумма заказа с учетом скидки ${saleValue}%: ${Math.round(sumPrice - (sumPrice * (saleValue / 100)))} руб. + 100 руб. за доставку (бесплатная доставка от ${minFreeDeliverySum} руб.)`)
        // }
        // else {
        //     $('.cart__sum').text(`Сумма заказа с учетом скидки ${saleValue}%: ${Math.round(sumPrice - (sumPrice * (saleValue / 100)))} руб.`)
        // }

        // Сумма корзины, если акций нет
        $('.cart__sum').text(`Сумма заказа: ${sumPrice} руб.`)
        const minFreeDeliverySum = 600
        if (sumPrice < 600) {
            $('.cart__sum').text(`Сумма заказа: ${sumPrice} руб. + 100 руб. за доставку`)
        } else {
            $('.cart__sum').text(`Сумма заказа: ${sumPrice} руб.`)
        }
    };

    if (!localStorage.getItem('rocket-delivery') || itemsInLocalStorage.length === 0) {
        $('.cart__empty').fadeIn(200);
        $('.cart, .cart__text, .cart__sum, .phone__form, .cart__delivery-cost').hide(0);
    }


    if (localStorage.getItem('rocket-delivery') && itemsInLocalStorage.length != 0) {
        $('.cart').fadeIn(100)
        $('.cart__sum').fadeIn(100)

        itemsInLocalStorage.forEach(element => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart__item');
            cartItem.innerHTML = `<div class="cart__title cart__item_col-1">${element.name}</div>
            <div class="cart__quantity cart__item_col-2"><div class="cart__quantity-minus">-</div><span>${element.quantity}</span><div class="cart__quantity-plus">+</div></div>
            <div class="cart__price cart__item_col-3">${element.price * element.quantity}</div><div class="cart__delete cart__item_col-4"><div data-id="${element.id}" class="cart__delete-btn"></div>`;
            $('.cart').append(cartItem)
        });
        getSum();

        $('.cart__delete-btn').on('click', function(event) {
            event.preventDefault();
            let deleteAnswer = confirm(`Вы действительно хотите удалить ${$(this).parents('.cart__item').children('.cart__title').text()} из корзины?`);
            if (deleteAnswer) {
                itemsInLocalStorage.forEach(element => {
                    let i = itemsInLocalStorage.indexOf(element);
                    if (element.id == $(this).attr('data-id')) {
                        itemsInLocalStorage.splice(i, 1);
                    }
                })
                localStorage.setItem('rocket-delivery', JSON.stringify(itemsInLocalStorage))
                $(this).parents('.cart__item').remove();
                if ($('.cart__title').toArray().length == 0) {
                    $('.cart, .cart__text, .cart__sum, .phone__form, .cart__delivery-cost, .cart__time-alert').fadeOut(500);
                    setTimeout(function() {
                        $('.cart__empty').fadeIn(500)
                    }, 1000)
                }
                getSum()

            }
        })


        $('.cart__quantity-plus').on('click', function(event) {
            event.preventDefault()
            let itemQuantity = Number($(this).closest('.cart__quantity').find('span').text());
            itemQuantity += 1;
            $(this).closest('.cart__quantity').find('span').text(itemQuantity);
            let itemCost = Number($(this).closest('.cart__item').find('.cart__price').text())
            let newPrice = (itemCost / (itemQuantity - 1)) * itemQuantity;
            $(this).closest('.cart__item').find('.cart__price').text(newPrice);

            getSum()

        })


        $('.cart__quantity-minus').on('click', function(event) {
            event.preventDefault()
            let itemQuantity = Number($(this).closest('.cart__quantity').find('span').text());
            if (itemQuantity > 1) {

                itemQuantity -= 1;
                $(this).closest('.cart__quantity').find('span').text(itemQuantity);
                let itemCost = Number($(this).closest('.cart__item').find('.cart__price').text())
                let newPrice = (itemCost / (itemQuantity + 1)) * itemQuantity;
                $(this).closest('.cart__item').find('.cart__price').text(newPrice)
            }
            getSum()
        });



    }


    //Обработка радиокнопок в корзине
    $("body").on('click', function(event) {
        const target = event.target;
        if (
            target.classList.contains("pay-method__cash") ||
            target.classList.contains("pay-method-sub__input") ||
            target.classList.contains("input__submit") ||
            target.classList.contains("pay-method-sub__number")
        ) {
            $(".pay-method__sub-block").fadeIn(700);
            // $(".pay-method-sub__input").toArray().forEach((element) => {
            //     element.setAttribute("required", true);
            // });
            $("body").on('click', function(event) {
                const target = event.target;
                if (target.classList.contains("need-cash")) {
                    $(".pay-method-sub__number-block").fadeIn(400);
                    // document.querySelector(".pay-method-sub__number").setAttribute("required", true);
                }
                document.querySelector(".pay-method-sub__number").addEventListener("input", function() {
                    document.querySelector(".need-cash").value = `Понадобится сдача c ${document.querySelector(".pay-method-sub__number").value}`;
                });
            })
        }
        if (target.classList.contains('pay-method__card')) {
            $(".pay-method__sub-block").fadeOut(700);
            // $(".pay-method-sub__input").toArray().forEach((element) => {
            //     element.setAttribute("required", false);
            // });
            // document.querySelector(".pay-method-sub__number").setAttribute("required", false);
        }
        if (target.classList.contains("dont-need-cash") || target.classList.contains("pay - method__card")) {
            $(".pay-method-sub__number-block").fadeOut(400);
            // document.querySelector(".pay-method-sub__number").setAttribute("required", false);
        }


        if (target.classList.contains('delivery-time__now')) {
            $(".delivery-time-sub__number-block").fadeOut(400);
        }
        if (target.classList.contains('delivery-time__later')) {
            $(".delivery-time-sub__number-block").fadeIn(400);
        }
    })


    // Обработка отправки формы
    $('.phone__form').on('submit', function(event) {
        event.preventDefault();

        // let orderInfo = $('.cart__title, .cart__quantity, .cart__sum').text();
        // orderInfo = orderInfo.replace(/'+'/g, `;\n      `);
        let cartItems = document.querySelectorAll('.cart__item')
        let orderInfo = '';
        cartItems.forEach(el => {
            try {
                orderInfo += `${el.querySelector('.cart__title').textContent} - ${el.querySelector('.cart__quantity span').textContent} шт. - ${el.querySelector('.cart__price').textContent} руб.                   `
            } catch {}
        })
        orderInfo += $('.cart__sum').text()

        $('.form__order').val(orderInfo);
        orderAdress = `Ул. ${$.trim(
          $(".form-adress__street").val()
        )} д. ${$.trim($(".form-adress__build").val())} кв. ${$.trim(
          $(".form-adress__apartment").val()
        )} подъезд: ${$.trim(
          $(".form-adress__entrance").val()
        )}, домофон: ${$.trim(
          $(".form-adress__intercom").val()
        )}, этаж: ${$.trim($(".form-adress__floor").val())}`;

        $(".form-adress__data").val(orderAdress);
        localStorage.setItem('rocket-delivery', [])
        let fd = new FormData(this);
        $.ajax({
            url: '../cart-personal/assets/telegram.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            success: function(msg) {
                msg = msg.trim()
                if (msg == 'ok') {
                    document.location.href = "https://pizza-rocket.ru/thx/";
                } else {
                    alert('Ошибка')
                }
            }
        });
    })


})