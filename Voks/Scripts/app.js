$(function () {
    'use strict';

    var categoriesBasePath = $('#categories-base-path').val();

    var setupCategories = function (callbacks) {
        var getThumbmailImages = function (category) {
            var images = [];
            for (var i = 0; i < 4 && i < category.Images.length; i++) {
                images.push(category.Images[i]);
            }
            return images;
        };

        var selectCategory = function ($category) {
            $('.category.selected').removeClass('selected');
            $category.addClass('selected');

            callbacks.selected($category.data('category'));
        };

        $('.category').each(function () {
            var $category = $(this);
            var category = $category.data('category');

            var thumbmailImages = getThumbmailImages(category);

            var thumbmailsHtml = '';
            for (var i = 0; i < thumbmailImages.length; i++) {
                var imagePath = categoriesBasePath + '/' + category.Name + '/' + thumbmailImages[i];
                thumbmailsHtml += '<img src="' + imagePath + '" />';
            }

            $category.find('.category-thumbmails').html(thumbmailsHtml);
        });

        $(document).on('click', '.category', function () {
            selectCategory($(this));
        });
        selectCategory($('.category:first'));
    };

    var setupAvailableImages = function (callbacks) {
        var $availableImages = $('#images > .scrolls');
        var createImageHtml = function (imagePath) {
            var fullPath = categoriesBasePath + '/' + imagePath;
            return '<div class="selectable-box"><img src="' + fullPath + '" /></div>';
        };
        var refresh = function (category) {
            var newAvailableImages = '';
            category.Images.forEach(function (imageName) {
                newAvailableImages += createImageHtml(category.Name + '/' + imageName);
            });

            $availableImages.html(newAvailableImages);
        };

        $availableImages.on('click', '.selectable-box', function () {
            callbacks.selected(this);
        });

        return {
            refresh: refresh
        };
    };

    var selectedImages = (function () {
        var $selectedImages = $('#selected-images > .scrolls');
        var appendImage = function (image) {
            $selectedImages.append(image.outerHTML);
        };

        $selectedImages.on('click', '.selectable-box', function () {
            $(this).remove();
        });

        return {
            appendImage: appendImage
        };
    })();

    var availableImages = setupAvailableImages({
        selected: selectedImages.appendImage
    });
    setupCategories({
        selected: availableImages.refresh
    });
});