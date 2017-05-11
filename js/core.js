$(document).ready(function() {
    
	
    // initScripts
    function init() {
        simpleCheck();
        searchToggle();
        slider();
        toggleElement('.js-mobile-search', '.js-search');
        toggleElement('.js-mobile-menu', '.js-menu');
        simpleSlider();
    }

    init();


    // scripts
    function simpleCheck() {
        // Simple inputs
        $('input[type="radio"]:checked').parent('.simple-radio').addClass('checked');

        $('.simple-check').each(function () {
            if ($(this).children('input').is(':checked')) {
                $(this).addClass('checked');
            }
        });

        $(document).on('change', '.simple-radio', function () {
            var name = $(this).children('input').attr('name');
            $('input[name="' + name + '"]').parent('.simple-radio').removeClass('checked');
            $(this).addClass('checked');
        });

        $(document).on('change', '.simple-check', function () {
            if ($(this).children('input').is(':checked')) {
                $(this).addClass('checked');
            }
            else {
                $(this).removeClass('checked');
            }
        });

    }

    function searchToggle() {
        var hideBlur = true;

        $(document).on('click', '.js-search', toggle);

        $(document).on('blur', '.search__ipt', blur);

        $(document).on('click', '.search__btn', submit);

        function toggle() {
            var $this = $(this);
            var $ipt = $this.children('.search__ipt');
            clearTimeout(hideBlur);

            if(!$this.hasClass('active')) {
                $this.addClass('active');
                $ipt.focus();
            }

            else {
                return false;
            }
        }

        function blur() {
            var $this = $(this);
            var $parent = $this.parent('.js-search');

            if($this.val() == 0) {
                hideBlur = setTimeout(function() {
                    $parent.removeClass('active');
                }, 300);
            }
        }

        function submit() {
            var $this = $(this);
            var $ipt = $this.siblings('.search__ipt');

            if($ipt.val() == 0) {
                $ipt.focus();
            }
        }

    }

    function slider() {
        var $this = $('.js-slider');
        var slider = new Swiper($this, {
            speed: 700,
            simulateTouch: false,
            paginationClickable: true,
            pagination: $this.find('.swiper-pagination')[0],
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            loop: true
        });   
    }

    function toggleElement(button, element) {
        $(document).on('click', button, function(e) {
            e.preventDefault();

            var $this = $(this);
            var $element = $(element);

            if($this.hasClass('active')) {
                $element.slideUp(300, function(){
                    $this.removeClass('active');
                });
            }
            else {
                $element.slideDown(300, function(){
                    $this.addClass('active');
                });
            }
        });
    }

    function simpleSlider() {

        $('.js-simple-slider').each(function(index) {
            var $this = $(this);
  
            var slider = new Swiper($this, {
                speed: 700,
                simulateTouch: false,
                paginationClickable: true,
                pagination: $this.find('.swiper-pagination')[0],
                nextButton: $this.parent('.simple-slider').children('.swiper-button-next')[0],
                prevButton: $this.parent('.simple-slider').children('.swiper-button-prev')[0],
                slidesPerView: 3,
                slidesPerColumn: 1,
                spaceBetween: 30,
                breakpoints: {
                    767: {
                        slidesPerView: 1
                    }
                },
            });  

        });


    }

    
         
});