<script>
(function(){
  var ORIGIN = 'WIDGET_ORIGIN'; // replace with your deployed URL
  var btn = document.createElement('button');
  btn.textContent = 'iTradeHelp';
  btn.style.position='fixed'; btn.style.bottom='16px'; btn.style.right='16px';
  btn.style.background='#e70012'; btn.style.color='#fff'; btn.style.border='0';
  btn.style.borderRadius='999px'; btn.style.padding='12px 16px';
  btn.style.boxShadow='0 8px 20px rgba(0,0,0,0.3)'; btn.style.zIndex='2147483000';

  var frame = document.createElement('iframe');
  frame.src = ORIGIN;
  frame.style.position='fixed'; frame.style.bottom='72px'; frame.style.right='16px';
  frame.style.width='420px'; frame.style.maxWidth='92vw'; frame.style.height='560px';
  frame.style.border='1px solid #1e2740'; frame.style.borderRadius='16px';
  frame.style.boxShadow='0 10px 30px rgba(0,0,0,0.35)'; frame.style.background='white';
  frame.style.display='none'; frame.style.zIndex='2147483000';

  btn.addEventListener('click', function(){ frame.style.display = (frame.style.display==='none' ? 'block':'none') });

  document.body.appendChild(btn); document.body.appendChild(frame);
})();
</script>
