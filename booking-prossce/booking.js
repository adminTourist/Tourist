
// Handle form submission
$('#bookingForm').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    var name = $('#name').val();
    var email = $('#email').val();
    var datetime = $('#datetime').val();
    var location = $('#select1 option:selected').text();
    var message = $('#message').val();


    // Create an object to store booking information
    var bookingInfo = {
        name: name,
        email: email,
        datetime: datetime,
        location: location,
        message: message
    };

    // Convert the object to a JSON string and save to localStorage
    var bookingInfoStr = JSON.stringify(bookingInfo);
    localStorage.setItem('bookingInfo', bookingInfoStr);

    // Reset the form after processing
    $('#bookingForm')[0].reset();

    // Prepare email parameters
    var templateParamsAdmin = {
        to_email: 'letramm204@gmail.com', // Địa chỉ email người nhận
        from_name: 'Your Name', // Tên người gửi (bạn)
        reply_to: email, // Địa chỉ email để reply lại (của người gửi)
        subject: 'New Booking Information', // Chủ đề của email
        message_html: 'Tên đầy đủ: ' + name + '\n' +
                      'Email: ' + email + '\n' +
                      'Ngày giờ: ' + datetime + '\n' +
                      'Chuyến Tour: ' + location + '\n' +
                      'Lời ghi chú  : ' + message
    };
    var templateParamsCustomer = {
        to_email: email, // Địa chỉ email của khách hàng
        from_name: 'TOURIST', // Tên người gửi (của bạn hoặc công ty)
        reply_to: 'letramm204@gmail.com', // Địa chỉ email để reply lại (của admin)
        subject: 'Xác nhận: Thông tin bạn đặt', // Chủ đề của email cho khách hàng
        message_html: 'Tên đầy đủ: ' + name + '\n' +
                      'Email: ' + email + '\n' +
                      'Ngày giờ: ' + datetime + '\n' +
                      'Chuyến Tour: ' + location + '\n' +
                      'Lời ghi chú  : ' + message
    };


    // Gửi email cho admin sử dụng EmailJS
    emailjs.send('service_8uqu8lb', 'template_dqrw6hn', templateParamsAdmin)
        .then(function(response) {
            console.log('Email sent:', response);
            alert('Đặt Tour thành công! bạn hãy xem hộp thử email của bạn nhá!');
        })
        .catch(function(error) {
            console.error('Email send failed:', error);
            //alert('Booking successful! Your information has been saved, but there was an error sending the email.');
        });

     // Gửi email cho khách hàng sử dụng EmailJS
     emailjs.send('service_8uqu8lb', 'template_g4eylzx', templateParamsCustomer)
     .then(function(response) {
         console.log('Email sent to customer:', response);
     })
     .catch(function(error) {
         console.error('Email send to customer failed:', error);
     });

    // Reset form sau khi xử lý
    this.reset();
});

