// Data kept in arrays/objects so prices and discounts are easy to change
const VAT_RATE = 0.15;
const services = [
  { id: 'maint', name: 'Garden maintenance',      price: 350,  unit: 'visit' },
  { id: 'lawn',  name: 'Lawn mowing and edging',  price: 250,  unit: 'visit' },
  { id: 'hedge', name: 'Hedge and tree trimming', price: 450,  unit: 'visit' },
  { id: 'land',  name: 'Landscaping',             price: 1200, unit: 'day' },
  { id: 'irrig', name: 'Irrigation installation', price: 900,  unit: 'zone' }
];
const discountTiers = [{ min: 6, rate: 0.10 }, { min: 3, rate: 0.05 }]; // highest matching tier wins
const invoiceLines = []; // array of lines on the invoice
let invoiceNo = 1000;

const $ = id => document.getElementById(id);
const rand = n => 'R' + n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Fill the drop-down from the services array
$('service').innerHTML = '<option value="">-- Select a service --</option>' +
  services.map(s => `<option value="${s.id}">${s.name} (${rand(s.price)} per ${s.unit})</option>`).join('');

function fail(id, msg) { $(id).classList.add('invalid'); $('err-' + id).textContent = msg; return false; }
function clearErrors() {
  document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}
function validateCustomer() {
  let ok = true;
  if ($('cname').value.trim().length < 2) ok = fail('cname', 'Enter the customer name.');
  if (!emailOk($('cemail').value.trim())) ok = fail('cemail', 'Enter a valid email address.');
  return ok;
}
function validateItem() {
  let ok = true;
  const qty = $('qty').value.trim();
  if ($('service').value === '') ok = fail('service', 'Choose a service from the list.');
  if (qty === '' || isNaN(qty)) ok = fail('qty', 'Enter a number.');
  else if (!Number.isInteger(Number(qty)) || Number(qty) < 1 || Number(qty) > 50) ok = fail('qty', 'Enter a whole number from 1 to 50.');
  return ok;
}
function discountFor(qty) {
  const tier = discountTiers.find(t => qty >= t.min);
  return tier ? tier.rate : 0;
}

function addLine() {
  clearErrors();
  const a = validateCustomer(), b = validateItem();
  if (!(a && b)) return;
  const s = services.find(x => x.id === $('service').value);
  const qty = Number($('qty').value), gross = s.price * qty, rate = discountFor(qty);
  invoiceLines.push({ name: s.name, price: s.price, qty, gross, rate, discount: gross * rate });
  $('service').value = ''; $('qty').value = '';
  render();
}
function removeLine(i) { invoiceLines.splice(i, 1); render(); }

function render() {
  const body = $('invoice-body');
  if (invoiceLines.length === 0) {
    body.innerHTML = '<tr><td colspan="5">No items yet. Add a service above.</td></tr>';
  } else {
    body.innerHTML = invoiceLines.map((l, i) => `<tr>
      <td>${l.name}</td><td class="num">${l.qty} × ${rand(l.price)}</td>
      <td class="num">${l.rate ? '-' + rand(l.discount) + ' (' + l.rate * 100 + '%)' : '–'}</td>
      <td class="num">${rand(l.gross - l.discount)}</td>
      <td><button type="button" class="btn outline" style="padding:4px 12px;min-height:0" onclick="removeLine(${i})">Remove</button></td></tr>`).join('');
  }
  const subtotal = invoiceLines.reduce((t, l) => t + l.gross, 0);
  const disc = invoiceLines.reduce((t, l) => t + l.discount, 0);
  const vat = (subtotal - disc) * VAT_RATE;
  $('t-sub').textContent = rand(subtotal);
  $('t-disc').textContent = '-' + rand(disc);
  $('t-vat').textContent = rand(vat);
  $('t-total').textContent = rand(subtotal - disc + vat);
}

function showInvoice() {
  clearErrors();
  if (!validateCustomer()) return;
  if (invoiceLines.length === 0) { fail('service', 'Add at least one service before creating the invoice.'); return; }
  invoiceNo++;
  $('invoice-head').textContent = `Invoice GL-${invoiceNo} · ${new Date().toLocaleDateString('en-ZA')} · Billed to ${$('cname').value.trim()} (${$('cemail').value.trim()})`;
  $('invoice-head').hidden = false;
  $('invoice-head').scrollIntoView({ behavior: 'smooth' });
}

$('add-btn').addEventListener('click', addLine);
$('invoice-btn').addEventListener('click', showInvoice);
$('clear-btn').addEventListener('click', () => { invoiceLines.length = 0; $('fees-form').reset(); clearErrors(); $('invoice-head').hidden = true; render(); });
$('fees-form').addEventListener('submit', e => e.preventDefault());
render();
