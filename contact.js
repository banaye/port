emailjs.init("uT19oVtgOnopubGMH");
async function handleSubmit() {
    const fname   = document.getElementById('fname').value.trim();
    const lname   = document.getElementById('lname').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!fname || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';

    try {
      // ── STEP 2: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID ──
      await emailjs.send("service_sk3gkkf", "template_01q8w6p", {
        from_name:  fname + ' ' + lname,
        from_email: email,
        service:    service || 'Gmail',
        message:    message,
        reply_to:   email
      });

      document.getElementById('successMsg').style.display = 'block';
      ['fname','lname','email','message'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('service').selectedIndex = 0;

    } catch (err) {
      console.error('EmailJS error:', err);
      document.getElementById('errorMsg').style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Send Message →';
  }