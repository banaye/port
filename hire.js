emailjs.init("uT19oVtgOnopubGMH");
document.getElementById('email').addEventListener('input', function() {
    document.getElementById('replyto').value = this.value;
  });

  // Timeline label
  function updateTimeline(val) {
    const el = document.getElementById('timeline-val');
    el.textContent = val == 1 ? '1 week' : val + ' weeks';
  }

  // File name display
  function showFileName(input) {
    const el = document.getElementById('file-name');
    if (input.files && input.files[0]) {
      el.textContent = '✓ ' + input.files[0].name;
      el.style.display = 'block';
    }
  }

  // Custom checkboxes
  document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', function() {
      const box = this.parentElement.querySelector('.check-box');
      box.style.background = this.checked ? 'var(--red)' : 'var(--cream)';
      box.style.borderColor = this.checked ? 'var(--red)' : 'var(--border)';
    });
  });

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
