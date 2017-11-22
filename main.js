$( () => {
    const $orders = $('#orders');
    const $name = $('#name');
    const $drink = $('#drink');

    //TEMPLETE
    var orderTemplate = $('#order-template').html();

    function template(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    }

    //GET
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/johnbob/friends/',
        success: (orders) => {
            $.each(orders, (index, order) => {
                if(order.name && order.drink) {
                    template(order);    
                }
                
            });  
         },
        error: () => {
            alert('error loading orders');
        } 
    });

    //POST
    $('#add-order').on('click', ()=> {
        const order = {
            name: $name.val(),
            drink: $drink.val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/johnbob/friends/',
            data: order,
            success: (newOrder) => {
                template(newOrder);
            },
            error: () => {
                alert('error saving orders');
            } 
        });
    });

    //DELETE
    $orders.delegate('.remove', 'click', function() {
        const $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/johnbob/friends/'+ $(this).attr('data-id'),
            success: () => {
                $li.fadeOut(300, () => {
                    $(this).remove();
                });
            }
        });
    });

    //PUT
    $orders.delegate('.editOrder', 'click', function() {
        const $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.drink').val($li.find('span.drink').html());
        $li.addClass('edit');
    });

    $orders.delegate('.cancelEdit', 'click', function() {
        const $li = $(this).closest('li');
        $li.removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function() {
        const $li = $(this).closest('li');
        const order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };

        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/johnbob/friends/'+ $li.attr('data-id'),
            data: order,
            success: (newOrder) => {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            },
            error: () => {
                alert('error updating order');
            } 
        });
    });
});