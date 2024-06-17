
// Handle form submission
$('#bookingForm').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    var name = $('#name').val();
    var email = $('#email').val();
    var datetime = $('#datetime').val();
    var location = $('#location option:selected').text();
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
    var templateParams = {
        to_email: 'pvpminecrafthighlight@gmail.com', // Địa chỉ email người nhận
        from_name: 'Your Name', // Tên người gửi (bạn)
        reply_to: email, // Địa chỉ email để reply lại (của người gửi)
        subject: 'New Booking Information', // Chủ đề của email
        message_html: 'Name: ' + name + '\n' +
                      'Email: ' + email + '\n' +
                      'Datetime: ' + datetime + '\n' +
                      'Location: ' + location + '\n' +
                      'Message  : ' + message
    };

    // Gửi email sử dụng EmailJS
    emailjs.send('service_8uqu8lb', 'template_g4eylzx', templateParams)
        .then(function(response) {
            console.log('Email sent:', response);
            alert('Booking successful! Your information has been saved and an email has been sent.');
        })
        .catch(function(error) {
            console.error('Email send failed:', error);
            alert('Booking successful! Your information has been saved, but there was an error sending the email.');
        });
});

