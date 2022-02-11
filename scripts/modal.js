$(document).ready(function() {
  // MODAL
  var modalText = {
    protoolstoreaper: {
      title: 'ProTools to Reaper',
      tag: 'eCommerce Website',
      detail:
        'ProTools to Reaper needed a major redesign that simplified and unified the user journey through the website. Now with a built-in overlay for the shopping experience, and a consistent theme throughout the website.',
      link: 'http://testing.bgdevelops.com/index.html'
    },   
    psi: {
      title: 'Precision Safety Inc.',
      tag: 'Business Website',
      detail:
        'My work with Precision Safety Inc. began with the creation of a brand identity that would reflect its key company values and distinct approach to safety consultations. Extending PSIs positioning of interconnectedness, my full scope of work also included website design & development, SEO, presentations and other asset creation.',
      link: 'https://precisionsafetyinc.com'
    },
    ferrante: {
      title: 'Ferrante & Son Auto Sales',
      tag: 'Business Website',
      detail:
        'Ferrante & Son Auto Sales needed an entire website refresh that kept its familial feel to the business, but also catered to mobile users that wanted to view the car dealership inventory.',
      link: 'https://ferranteandson.com'
    },
    holdtheline: {
      title: 'Hold The Line Coffee Company',
      tag: 'Business Website',
      detail:
        'From brand imaging development to website design, my work for Hold The Line Coffee Company consists of the creation of all things digital and print from website layout/design to product design. ',
      link: 'https://holdthelinecoffee.com'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('images/slide/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
