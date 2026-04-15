/* ============================================================
   SHARED.JS — Smooth accordion close animation
   Uses Web Animations API (all modern browsers)
   Include on pages with <details> accordions
   ============================================================ */
(function(){
  document.addEventListener('click',function(e){
    var summary=e.target.closest('summary');
    if(!summary) return;
    var details=summary.closest('details');
    if(!details||!details.open) return;

    // Let the browser handle opening; we only animate closing
    e.preventDefault();
    var content=details.querySelector('.content,.accordionBody,.hierSubBody,.subBlock');
    if(!content){details.open=false;return;}

    var h=content.scrollHeight;
    content.style.overflow='hidden';
    var anim=content.animate(
      [{opacity:1,maxHeight:h+'px'},{opacity:0,maxHeight:'0px'}],
      {duration:180,easing:'cubic-bezier(.22,.61,.36,1)'}
    );
    anim.onfinish=function(){
      details.open=false;
      content.style.overflow='';
    };
  });
})();
