$(function () {
    'use strict';

    var getCategoryThumbmailImages = function (category) {
        var images = [];
        for (var i = 0; i < 4 && i < category.Images.length; i++) {
            images.push(category.Images[i]);
        }
        return images;
    };

    var categoriesBasePath = $('#categories-base-path').val();
    var $availableImages = $('#images > .scrolls');
    var $selectedImages = $('#selected-images > .scrolls');

    var createImageHtml = function (imagePath) {
        var fullPath = categoriesBasePath + '/' + imagePath;
        return '<div class="selectable-box"><img src="' + fullPath + '" /></div>';
    };

    // categories
    var selectCategory = function ($category) {
        $('.category.selected').removeClass('selected');
        $category.addClass('selected');

        var category = $category.data('category');

        var newAvailableImages = '';
        category.Images.forEach(function (imageName) {
            newAvailableImages += createImageHtml(category.Name + '/' + imageName);
        });

        $availableImages.html(newAvailableImages);
    };

    $(document).on('click', '.category', function () {
        selectCategory($(this));
    });
    selectCategory($('.category:first'));

    $('.category').each(function () {
        var $category = $(this);
        var category = $category.data('category');

        var thumbmailImages = getCategoryThumbmailImages(category);

        var thumbmailsHtml = '';
        for (var i = 0; i < thumbmailImages.length; i++) {
            var imagePath = categoriesBasePath + '/' + category.Name + '/' + thumbmailImages[i];
            thumbmailsHtml += '<img src="' + imagePath + '" />';
        }

        $category.find('.category-thumbmails').html(thumbmailsHtml);
    });

    // category images
    $availableImages.on('click', '.selectable-box', function () {
        $selectedImages.append(this.outerHTML)
    });

    // selected images
    $selectedImages.on('click', '.selectable-box', function () {
        $(this).remove();
    });
});