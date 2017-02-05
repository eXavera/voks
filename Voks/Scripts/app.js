$(function () {
    'use strict';

    var categoriesBasePath = $('#categories-base-path').val();

    var setupScrollButtons = function ($section) {
        var $scrolls = $section.find('.scrolls');

        var getOffsets = function () {
            return $scrolls.find('.selectable-box').map(function () {
                return this.offsetLeft;
            });
        };

        var setupButton = function (selector, getNewOffset) {
            $section.on('click', selector, function () {
                var offsets = getOffsets();

                $scrolls.animate({
                    scrollLeft: getNewOffset(offsets, $scrolls.scrollLeft())
                }, 250);
            });
        };

        setupButton('.back', function (offsets, currentOffset) {
            for (var i = offsets.length - 1; i >= 0; i--) {
                if (offsets[i] < currentOffset) {
                    return offsets[i];
                }
            }
            return currentOffset;
        });

        setupButton('.forward', function (offsets, currentOffset) {
            for (var i = 0; i < offsets.length; i++) {
                if (offsets[i] > currentOffset) {
                    return offsets[i];
                }
            }
            return currentOffset;
        });
    };

    var setupHorizontalMouseWheelScrolling = function ($section) {
        var $scrolls = $section.find('.scrolls');

        $scrolls.on('wheel', function (e) {
            var delta = e.originalEvent.deltaY;
            if (delta !== 0) {
                $scrolls.scrollLeft($scrolls.scrollLeft() + (delta > 0 ? 50 : -50));

                e.preventDefault();
            }
        });
    };

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

        var $section = $('#categories');
        setupScrollButtons($section);
        setupHorizontalMouseWheelScrolling($section);

        $(document).on('click', '.category', function () {
            selectCategory($(this));
        });
        selectCategory($('.category:first'));
    };

    var setupAvailableImages = function (callbacks) {
        var $section = $('#images');
        var $availableImages = $section.find('.scrolls');

        setupScrollButtons($section);
        setupHorizontalMouseWheelScrolling($section);

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
        var $section = $('#selected-images');
        var $selectedImages = $section.find('.scrolls');

        setupScrollButtons($section);
        setupHorizontalMouseWheelScrolling($section);

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