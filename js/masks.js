/**
 * ============================================
 * INPUT MASKS - MyONG Platform
 * Máscaras para campos de entrada
 * ============================================
 */

(function() {
  'use strict';

  // ===== CPF MASK (000.000.000-00) =====
  function cpfMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  // ===== CNPJ MASK (00.000.000/0000-00) =====
  function cnpjMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  // ===== PHONE MASK ((00) 00000-0000 or (00) 0000-0000) =====
  function phoneMask(value) {
    value = value.replace(/\D/g, '');
    
    if (value.length <= 10) {
      // Fixed phone: (00) 0000-0000
      return value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    } else {
      // Mobile phone: (00) 00000-0000
      return value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }
  }

  // ===== CEP MASK (00000-000) =====
  function cepMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  // ===== DATE MASK (00/00/0000) =====
  function dateMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  }

  // ===== CURRENCY MASK (R$ 0.000,00) =====
  function currencyMask(value) {
    value = value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return 'R$ ' + value;
  }

  // ===== CREDIT CARD MASK (0000 0000 0000 0000) =====
  function creditCardMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\s\d{4})\d+?$/, '$1');
  }

  // ===== APPLY MASK =====
  function applyMask(input, maskFunction) {
    input.addEventListener('input', function(e) {
      const cursorPosition = this.selectionStart;
      const oldValue = this.value;
      const newValue = maskFunction(oldValue);
      
      this.value = newValue;
      
      // Adjust cursor position
      if (newValue.length > oldValue.length) {
        this.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      } else if (newValue.length < oldValue.length) {
        this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      } else {
        this.setSelectionRange(cursorPosition, cursorPosition);
      }
    });

    // Prevent non-numeric input
    input.addEventListener('keypress', function(e) {
      const char = String.fromCharCode(e.which);
      if (!/[\d]/.test(char)) {
        e.preventDefault();
      }
    });
  }

  // ===== INITIALIZE MASKS =====
  
  // CPF inputs
  const cpfInputs = document.querySelectorAll('input[id*="cpf"]');
  cpfInputs.forEach(input => {
    input.setAttribute('maxlength', '14');
    input.setAttribute('placeholder', '000.000.000-00');
    applyMask(input, cpfMask);
  });

  // CNPJ inputs
  const cnpjInputs = document.querySelectorAll('input[id*="cnpj"]');
  cnpjInputs.forEach(input => {
    input.setAttribute('maxlength', '18');
    input.setAttribute('placeholder', '00.000.000/0000-00');
    applyMask(input, cnpjMask);
  });

  // Phone inputs
  const phoneInputs = document.querySelectorAll('input[id*="phone"], input[type="tel"]');
  phoneInputs.forEach(input => {
    input.setAttribute('maxlength', '15');
    input.setAttribute('placeholder', '(11) 99999-9999');
    applyMask(input, phoneMask);
  });

  // CEP inputs
  const cepInputs = document.querySelectorAll('input[id*="cep"]');
  cepInputs.forEach(input => {
    input.setAttribute('maxlength', '9');
    input.setAttribute('placeholder', '00000-000');
    applyMask(input, cepMask);
  });

  // Currency inputs
  const currencyInputs = document.querySelectorAll('input[data-mask="currency"]');
  currencyInputs.forEach(input => {
    input.setAttribute('placeholder', 'R$ 0,00');
    applyMask(input, currencyMask);
  });

  // Credit card inputs
  const creditCardInputs = document.querySelectorAll('input[data-mask="credit-card"]');
  creditCardInputs.forEach(input => {
    input.setAttribute('maxlength', '19');
    input.setAttribute('placeholder', '0000 0000 0000 0000');
    applyMask(input, creditCardMask);
  });

  // ===== REMOVE NON-NUMERIC CHARACTERS FOR FORM SUBMISSION =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Create a copy of masked values for display
      const maskedInputs = this.querySelectorAll('input[id*="cpf"], input[id*="cnpj"], input[id*="phone"], input[id*="cep"]');
      
      maskedInputs.forEach(input => {
        // Store original value
        input.dataset.originalValue = input.value;
        // Remove mask for submission
        input.value = input.value.replace(/\D/g, '');
      });
      
      // Note: In production, you might want to restore the masked value after submission
      // or handle this differently based on your backend requirements
    });
  });

  // ===== AUTO-TAB FUNCTIONALITY =====
  function setupAutoTab(inputs) {
    inputs.forEach((input, index) => {
      input.addEventListener('input', function() {
        const maxLength = parseInt(this.getAttribute('maxlength'));
        
        if (this.value.length >= maxLength && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  }

  // Example: Setup auto-tab for OTP or similar inputs
  const otpInputs = document.querySelectorAll('input[data-autotab]');
  if (otpInputs.length > 0) {
    setupAutoTab(otpInputs);
  }

  // ===== UPPERCASE INPUT =====
  const uppercaseInputs = document.querySelectorAll('input[data-uppercase]');
  uppercaseInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase();
    });
  });

  // ===== LOWERCASE INPUT =====
  const lowercaseInputs = document.querySelectorAll('input[data-lowercase]');
  lowercaseInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.toLowerCase();
    });
  });

  // ===== CAPITALIZE WORDS =====
  const capitalizeInputs = document.querySelectorAll('input[data-capitalize]');
  capitalizeInputs.forEach(input => {
    input.addEventListener('blur', function() {
      this.value = this.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });
  });

  // ===== NUMERIC ONLY INPUT =====
  const numericInputs = document.querySelectorAll('input[data-numeric]');
  numericInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
  });

  // ===== CONSOLE MESSAGE =====
  console.log('%cInput Masks Initialized', 'color: #2E8B57; font-weight: bold;');

})();
