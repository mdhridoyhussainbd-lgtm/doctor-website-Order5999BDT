(function(){
  const $ = (sel) => document.querySelector(sel);
  const config = window.WWM_CONFIG || {};

  let currentOrderId = '';
  let paymentData = {
    senderNumber: '',
    transactionId: '',
    orderId: ''
  };

  function generateOrderId() {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `DWP-${yy}${mm}${dd}-${rand}`;
  }

  function money(n){ return `৳${Number(n || 0).toLocaleString('en-US')}`; }

  function showToast(message){
    const toast = $('#toast');
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // Google Sheets submission via no-cors POST request
  function sendToGoogleSheets(data) {
    if (!config.apiEndpoint) return;
    try {
      fetch(config.apiEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      }).catch(err => {
        console.warn("Google Sheets submission fetch error:", err);
      });
    } catch (err) {
      console.warn("Google Sheets submission error:", err);
    }
  }

  function submitOrderData(stage, data) {
    // 1. LocalStorage backup
    try {
      const existing = JSON.parse(localStorage.getItem('wwm_orders') || '[]');
      existing.push({ ...data, savedAt: new Date().toISOString() });
      localStorage.setItem('wwm_orders', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // 2. Google Sheets API call (non-blocking)
    sendToGoogleSheets(data);
  }

  const phoneHref = `tel:+${config.supportPhoneE164 || '8801302778420'}`;
  const waBase = `https://wa.me/${config.whatsappNumber || '8801302778420'}`;
  const waIntro = encodeURIComponent('Hello Web Work Media, I am interested in the Professional Doctor Website package (৳5,999).');

  // Populate Header & Contact Links
  if($('#topPhone')) { $('#topPhone').textContent = `Call Web Work Media: ${config.supportPhoneDisplay || '+880 1302-778420'}`; $('#topPhone').href = phoneHref; }
  if($('#footerPhone')) { $('#footerPhone').textContent = config.supportPhoneDisplay || '+880 1302-778420'; $('#footerPhone').href = phoneHref; }
  if($('#footerEmail')) { $('#footerEmail').textContent = config.companyEmail || 'info@webworkmedia.net'; $('#footerEmail').href = `mailto:${config.companyEmail || 'info@webworkmedia.net'}`; }
  if($('#footerWebsite')) { $('#footerWebsite').href = config.website || 'https://webworkmedia.net'; }
  ['#heroWhatsApp','#sidebarWhatsApp'].forEach(id => { const el=$(id); if(el) el.href = `${waBase}?text=${waIntro}`; });

  // Populate Payment Details
  if($('#bkashNumber')) $('#bkashNumber').textContent = config.bkashNumber || '01302778420';
  if($('#bkashType')) $('#bkashType').textContent = `${config.bkashAccountType || 'Personal'} bKash`;
  if($('#year')) $('#year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const menuToggle = $('.menu-toggle');
  const mainNav = $('.main-nav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Copy bKash Number
  const copyBtn = $('#copyBkash');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const number = config.bkashNumber || '01302778420';
      try { 
        await navigator.clipboard.writeText(number.replace(/\s/g,'')); 
        showToast('bKash number copied to clipboard.'); 
      }
      catch(e){ 
        showToast(`bKash Number: ${number}`); 
      }
    });
  }

  // Terms Modal Functionality
  const termsModal = $('#termsModal');
  const openTermsBtn = $('#openTermsModal');
  const footerTermsBtn = $('#footerTermsLink');
  const closeTermsBtn = $('#closeTermsModal');
  const acceptTermsBtn = $('#acceptTermsModalBtn');

  function openTerms(){ if(termsModal) termsModal.classList.add('open'); }
  function closeTerms(){ if(termsModal) termsModal.classList.remove('open'); }

  if(openTermsBtn) openTermsBtn.addEventListener('click', (e) => { e.preventDefault(); openTerms(); });
  if(footerTermsBtn) footerTermsBtn.addEventListener('click', (e) => { e.preventDefault(); openTerms(); });
  if(closeTermsBtn) closeTermsBtn.addEventListener('click', closeTerms);
  if(acceptTermsBtn) acceptTermsBtn.addEventListener('click', () => {
    const cb = $('#termsCheckbox');
    if(cb) cb.checked = true;
    closeTerms();
    showToast('Terms & Conditions accepted.');
  });
  if(termsModal){
    termsModal.addEventListener('click', (e) => {
      if(e.target === termsModal) closeTerms();
    });
  }

  // Stepper Elements
  const tabStep1 = $('#tabStep1');
  const tabStep2 = $('#tabStep2');
  const numStep1 = $('#numStep1');
  const panelStep1 = $('#panelStep1');
  const panelStep2 = $('#panelStep2');
  const paymentConfirmForm = $('#paymentConfirmForm');
  const doctorOrderForm = $('#doctorOrderForm');
  const editPaymentBtn = $('#editPaymentBtn');

  // DYNAMIC CHAMBER ACTION HANDLERS
  const addChamber2Btn = $('#addChamber2Btn');
  const addChamber3Btn = $('#addChamber3Btn');
  const chamber2Wrapper = $('#chamber2Wrapper');
  const chamber3Wrapper = $('#chamber3Wrapper');
  const removeChamber2Btn = $('#removeChamber2Btn');
  const removeChamber3Btn = $('#removeChamber3Btn');

  if(addChamber2Btn && chamber2Wrapper){
    addChamber2Btn.addEventListener('click', () => {
      chamber2Wrapper.style.display = 'block';
      addChamber2Btn.style.display = 'none';
      if(addChamber3Btn) addChamber3Btn.style.display = 'inline-flex';
    });
  }
  if(removeChamber2Btn && chamber2Wrapper){
    removeChamber2Btn.addEventListener('click', () => {
      chamber2Wrapper.style.display = 'none';
      if(addChamber2Btn) addChamber2Btn.style.display = 'inline-flex';
      chamber2Wrapper.querySelectorAll('input, textarea').forEach(el => el.value = '');
    });
  }

  if(addChamber3Btn && chamber3Wrapper){
    addChamber3Btn.addEventListener('click', () => {
      chamber3Wrapper.style.display = 'block';
      addChamber3Btn.style.display = 'none';
    });
  }
  if(removeChamber3Btn && chamber3Wrapper){
    removeChamber3Btn.addEventListener('click', () => {
      chamber3Wrapper.style.display = 'none';
      if(addChamber3Btn) addChamber3Btn.style.display = 'inline-flex';
      chamber3Wrapper.querySelectorAll('input, textarea').forEach(el => el.value = '');
    });
  }

  // STEP 1: PAYMENT CONFIRMATION SUBMISSION
  if(paymentConfirmForm){
    paymentConfirmForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!paymentConfirmForm.reportValidity()) return;

      const senderVal = ($('#step1Sender')?.value || '').trim();
      const trxVal = ($('#step1Trx')?.value || '').trim();

      const phoneRegex = /^01[3-9]\d{8}$/;
      if(!phoneRegex.test(senderVal)){
        showToast('Please enter a valid 11-digit bKash sender number (e.g. 017XXXXXXXX).');
        return;
      }

      if(!senderVal || !trxVal){
        showToast('Please enter both bKash Sender Number and Transaction ID.');
        return;
      }

      // Do not generate a new Order ID if the same customer edits payment information
      if(!currentOrderId) {
        currentOrderId = generateOrderId();
      }

      paymentData.senderNumber = senderVal;
      paymentData.transactionId = trxVal;
      paymentData.orderId = currentOrderId;

      // Submit Stage "payment" to Google Sheets & LocalStorage
      submitOrderData("payment", {
        stage: "payment",
        orderId: currentOrderId,
        bkashSenderNumber: senderVal,
        transactionId: trxVal
      });

      // Show Step 1 Banner & Order ID
      const step1SuccessCard = $('#step1SuccessCard');
      const step1OrderIdDisplay = $('#step1OrderIdDisplay');
      if(step1OrderIdDisplay) step1OrderIdDisplay.textContent = currentOrderId;
      if(step1SuccessCard) step1SuccessCard.style.display = 'flex';

      // Update Summary Bar
      if($('#summaryOrderId')) $('#summaryOrderId').textContent = `Order ID: ${currentOrderId}`;
      if($('#summaryTrx')) $('#summaryTrx').textContent = `TrxID: ${paymentData.transactionId}`;
      if($('#summarySender')) $('#summarySender').textContent = `Sender: ${paymentData.senderNumber}`;

      // Update Stepper UI
      if(tabStep1){
        tabStep1.classList.remove('active');
        tabStep1.classList.add('completed');
      }
      if(numStep1) numStep1.textContent = '✓';

      if(tabStep2){
        tabStep2.classList.remove('disabled');
        tabStep2.classList.add('active');
      }

      setTimeout(() => {
        if(panelStep1) panelStep1.style.display = 'none';
        if(panelStep2) panelStep2.style.display = 'block';
        showToast(`Order ID: ${currentOrderId} — Payment details saved! Complete doctor info below.`);
        document.querySelector('#payment')?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    });
  }

  // EDIT PAYMENT INFO BUTTON
  if(editPaymentBtn){
    editPaymentBtn.addEventListener('click', () => {
      if(panelStep2) panelStep2.style.display = 'none';
      if(panelStep1) panelStep1.style.display = 'block';

      if(tabStep2){
        tabStep2.classList.remove('active');
        tabStep2.classList.add('disabled');
      }

      if(tabStep1){
        tabStep1.classList.remove('completed');
        tabStep1.classList.add('active');
      }
      if(numStep1) numStep1.textContent = '1';

      document.querySelector('#payment')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // STEP 2: DOCTOR ORDER FORM SUBMISSION
  if(doctorOrderForm){
    doctorOrderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Check Terms Checkbox
      const termsCb = $('#termsCheckbox');
      if(!termsCb || !termsCb.checked){
        showToast('Please read and accept the Terms & Conditions before submitting your order.');
        return;
      }

      if(!doctorOrderForm.reportValidity()) return;

      if(!paymentData.senderNumber || !paymentData.transactionId){
        showToast('Payment information missing. Please complete Step 1 first.');
        if(panelStep2) panelStep2.style.display = 'none';
        if(panelStep1) panelStep1.style.display = 'block';
        return;
      }

      const doctorSubmitBtn = $('#doctorSubmitBtn');
      if(doctorSubmitBtn) {
        doctorSubmitBtn.disabled = true;
        doctorSubmitBtn.textContent = 'Submitting Order…';
      }

      const fd = new FormData(doctorOrderForm);
      const val = (name) => (fd.get(name) || '').toString().trim();

      const orderId = currentOrderId || generateOrderId();
      const doctorName = val('fullName');
      const mobileNumber = val('doctorMobile');
      const email = val('professionalEmail');
      const transactionId = paymentData.transactionId;

      // Email & Phone regex validation check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        showToast('Please enter a valid professional email address.');
        if(doctorSubmitBtn) { doctorSubmitBtn.disabled = false; doctorSubmitBtn.textContent = 'Submit Website Order'; }
        return;
      }

      const phoneRegex = /^01[3-9]\d{8}$/;
      if(!phoneRegex.test(mobileNumber)){
        showToast('Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX).');
        if(doctorSubmitBtn) { doctorSubmitBtn.disabled = false; doctorSubmitBtn.textContent = 'Submit Website Order'; }
        return;
      }

      const doctorPayload = {
        stage: "doctor",
        orderId: orderId,
        customerName: doctorName,
        doctorName: doctorName,
        mobileNumber: mobileNumber,
        professionalEmail: email,
        bkashSenderNumber: paymentData.senderNumber,
        transactionId: transactionId,
        bmdcNumber: val('bmdc'),
        degrees: val('degrees'),
        speciality: val('speciality'),
        designation: val('designation'),
        workplace: val('workplace'),
        experience: val('experience'),
        chamber1Name: val('chamber1Name'),
        chamber1Address: val('chamber1Address'),
        chamber1VisitingTime: val('chamber1VisitingTime'),
        chamber1Appointment: val('chamber1Appointment'),
        chamber1Fee: val('chamber1Fee'),
        chamber2Name: val('chamber2Name'),
        chamber2Address: val('chamber2Address'),
        chamber2VisitingTime: val('chamber2VisitingTime'),
        chamber2Appointment: val('chamber2Appointment'),
        chamber2Fee: val('chamber2Fee'),
        chamber3Name: val('chamber3Name'),
        chamber3Address: val('chamber3Address'),
        chamber3VisitingTime: val('chamber3VisitingTime'),
        chamber3Appointment: val('chamber3Appointment'),
        chamber3Fee: val('chamber3Fee'),
        doctorWhatsapp: val('doctorWhatsapp'),
        facebookUrl: val('social'),
        otherSocialUrl: val('otherSocial'),
        googleMapsUrl: val('map'),
        domainPreference: val('domain'),
        notes: val('notes')
      };

      // Submit Stage "doctor" to Google Sheets & LocalStorage
      submitOrderData("doctor", doctorPayload);

      // Display Success Card on Page
      const orderSuccessCard = $('#orderSuccessCard');
      const step2OrderIdDisplay = $('#step2OrderIdDisplay');
      if(step2OrderIdDisplay) step2OrderIdDisplay.textContent = orderId;
      if(orderSuccessCard) orderSuccessCard.style.display = 'block';

      // Format WhatsApp Message
      const waTextLines = [
        'Hello Web Work Media,',
        '',
        'I have submitted my Doctor Website Package order.',
        '',
        `Order ID: ${orderId}`,
        `Package: Doctor Website – ${money(config.packagePrice || 5999)}`,
        `Advance: ${money(config.advanceAmount || 3000)}`,
        '',
        `Doctor Name: ${doctorName}`,
        `Mobile: ${mobileNumber}`,
        `Email: ${email}`,
        `Transaction ID: ${transactionId}`,
        '',
        'Please confirm once my payment has been verified.',
        '',
        'Thank you.'
      ];

      const url = `${waBase}?text=${encodeURIComponent(waTextLines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
      showToast('Doctor information submitted successfully!');

      setTimeout(() => {
        if(doctorSubmitBtn) {
          doctorSubmitBtn.disabled = false;
          doctorSubmitBtn.textContent = 'Submit Website Order';
        }
      }, 3000);
    });
  }

  // HERO MOCKUP CAROUSEL SLIDER
  const slides = document.querySelectorAll('.hero-slider-card .slide');
  const capsuleDots = document.querySelectorAll('.slider-capsule-nav .capsule-dot');
  const prevBtn = $('#heroPrevBtn');
  const nextBtn = $('#heroNextBtn');
  const urlText = $('#sliderUrlText');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index){
    if(!slides.length) return;
    if(index >= slides.length) currentSlide = 0;
    else if(index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, idx) => {
      const isActive = idx === currentSlide;
      slide.classList.toggle('active', isActive);
      if(isActive && urlText){
        const url = slide.getAttribute('data-url') || 'yourname.com';
        urlText.textContent = url;
      }
    });

    capsuleDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide(){ showSlide(currentSlide + 1); }
  function prevSlide(){ showSlide(currentSlide - 1); }

  function startAutoSlide(){
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 4500);
  }
  function stopAutoSlide(){
    if(slideInterval) clearInterval(slideInterval);
  }

  if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
  if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
  capsuleDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-slide') || '0', 10);
      showSlide(idx);
      startAutoSlide();
    });
  });

  const frameContainer = $('.browser-window-frame');
  if(frameContainer){
    frameContainer.addEventListener('mouseenter', stopAutoSlide);
    frameContainer.addEventListener('mouseleave', startAutoSlide);
  }

  if(slides.length) showSlide(0);
  if(slides.length) startAutoSlide();
})();
