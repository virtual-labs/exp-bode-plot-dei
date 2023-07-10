var mto = 0.5;
 var lab_imp = [],
     dat_imp = [],
     lab_step = [],
     dat_step = [],
     lab_final = [],
     poles = [],
     polesc = [];

var re_nyq1 = [],
    img_nyq1 = [],
    re_nyq2 = [],
    img_nyq2 = [];
var stepeqn,impuleqn;
var eqn;

var kpi,essi,esss,kp;
var wgc = 0, wpc = 0, gm, pm,cg,cp;
var conclusion = "";
 

 function addval() {
     lab = [];
     dat = [];
     wgc = 0, wpc = 0;
     gm = 0, pm = 0;
     cg=0, cp=0;
     a = "0"
     var nums, dens;
     var c1 = document.getElementById("numc").value;
     var d1 = document.getElementById("numd").value;
     var p1 = document.getElementById("dena").value;
     var q1 = document.getElementById("denb").value;
     var r1 = document.getElementById("denc").value;
     polesc = [];
     poles = [];
     var x1, y1;
     var ni = 0,
         di = 0;

     c = parseInt(c1);
     d = parseInt(d1);
     p = parseInt(p1);
     q = parseInt(q1);
     r = parseInt(r1);
     var a = 0;

    bode (c,d,p,q,r);
         
     lc = 1;
     document.getElementById("line1").setAttribute("style", "color:blue");
     document.getElementById("chartcont").setAttribute("style", "display:none");
     document.getElementById("out6").setAttribute("style", "display:none;");
     document.getElementById("chartcont1").setAttribute("style", "display:none;");
     document.getElementById("out4").setAttribute("style", "display:none;");
    
         
     for (let i = 1; i < 6; i++) {
         let out = "out" + i;
         let ln = "line" + (i + 1);
         document.getElementById(ln).setAttribute("Style", "color:black");
         document.getElementById(out).setAttribute("style", "display:none");
     }

    
     if(a==0 && p!=0 && c!=0 && d!=0)
mto=1;
else if((a!=0 && p==0)||(c!=0&&p==0&&q==0))
{
  mto=0;
  alert("Not a proper transfer function \nthe order of denominator should be greater than order of numerator");
}
else if(d!=0 && (q!=0 || p!=0))
{mto=1;}

else if(a==0 && c==0 && d==0)
{mto=0;
  alert("Not a proper transfer function \nplease provide some value for numerator as numerator cannot be zero");}
else if(p==0 && q==0 && r==0)
{mto=0;
  alert("Not a proper transfer function \nplease provide some value for denominator as denominator cannot be zero  ");
}
     
     if (mto) {
         document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
         document.getElementById("matwork").title = "";
         document.getElementById("mrun").disabled = false;
         document.getElementById("matwork").setAttribute("style", "opacity:1");
         document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
         document.getElementById("mrun").classList.add("mrunenabled");
         document.getElementById("matwork").classList.remove('mat');

        
        var numerator = "\\frac{";
        var numerator2 = "\\frac{";
if(a!=0)
numerator=numerator+a+"s^2";
if(c!=0)
  if(a!=0)
    if(c>0)
      numerator=numerator+" + " + c+"s";
    else
      numerator=numerator + c+"s";
  else
  numerator=numerator+ c+"s";
if(d!=0)
  if(a!=0 || c!=0)
if(d>0)
      numerator=numerator+" + " + d;
    else
      numerator=numerator + d;
  else
  numerator=numerator+ d;
numerator=numerator+"}";
var denominator = "{";
if(p!=0)
denominator=denominator+p+"s^2";
if(q!=0)
  if(p!=0)
    if(q>0)
      denominator=denominator+ " + " + q+"s";
    else
      denominator=denominator + q+"s";
  else
    denominator=denominator+ q+"s";
if(r!=0)
  if(p!=0||q!=0)
  if(r>0)
      denominator=denominator+ " + " + r;
    else
      denominator=denominator + r;
else
  denominator=denominator+ r;
denominator=denominator+"}}$$";
eqn = "$${ G(s) = "+numerator + denominator;

if(a!=0)
numerator2=numerator2+a+"(jw)^2";
if(c!=0)
  if(a!=0)
    if(c>0)
      numerator2=numerator2+" + " + c+"(jw)";
    else
      numerator2=numerator2 + c+"(jw)";
  else
  numerator2=numerator2+ c+"(jw)";
if(d!=0)
  if(a!=0 || c!=0)
if(d>0)
      numerator2=numerator2+" + " + d;
    else
      numerator2=numerator2 + d;
  else
  numerator2=numerator2+ d;
numerator2=numerator2+"}";

var denominator2 = "{";
if(p!=0)
denominator2=denominator2+p+"(jw)^2";
if(q!=0)
  if(p!=0)
    if(q>0)
      denominator2=denominator2+ " + " + q+"(jw)";
    else
      denominator2=denominator2 + q+"(jw)";
  else
    denominator2=denominator2+ q+"(jw)";
if(r!=0)
  if(p!=0||q!=0)
  if(r>0)
      denominator2=denominator2+ " + " + r;
    else
      denominator2=denominator2 + r;
else
  denominator2=denominator2+ r;
denominator2=denominator2+"}}$$";
         

        var numerator3 = "$${ |G(jw)H(jw)| ^2= \\frac{";
        if (c!=0&&d!=0)
        numerator3 = numerator3+"("+c+")^2w^2 + ("+d+")^2";
        else if (c!=0)
        numerator3 = numerator3+"("+c+"w)^2";
        else
        numerator3 = numerator3+"("+d+")^2";
        
        var denominator3 = "}{";
        if (p!=0&&q!=0&&r!=0)
        denominator3 = denominator3+"("+q+") ^2w ^2 + ("+r+" - ("+p+"w^2)) ^2} }$$";
        else if (p!=0&&q!=0)
        denominator3 = denominator3+"("+q+") ^2w ^2 + ("+p+"w^2) ^2} }$$";
        else if (p!=0&&r!=0)
        denominator3 = denominator3+"("+r+" - ("+p+" w^2))^2 }}$$";
        else if (q!=0&&r!=0)
        denominator3 = denominator3+"("+q+") ^2w ^2 + ("+r+")^2}}$$";
        else if (p!=0)
        denominator3 = denominator3+"("+p+"w^2)^2}}$$";
        else if (q!=0)
        denominator3 = denominator3+"("+q+"w)^2}}$$";
        else
        denominator3 = denominator3+"("+r+")^2}}$$";

        var out4 = "$${ Angle = tan^{-1} ";

        if (c!=0&&d!=0)
        out4 = out4 + "\\frac{"+c+"w}{"+d+"}";
        else if (c!=0)
        out4 = out4 + "(∞)";
        else
        out4 = out4 + "(0)";

        out4 = out4 + " - tan^{-1} ";

        if (p!=0&&q!=0&&r!=0)
        out4 = out4 + "\\frac{"+q+"w}{"+r+" - ("+p+"w^2)}}$$";
        else if (p!=0&&q!=0)
        out4 = out4 + "\\frac{"+q+"}{-("+p+"w)}}$$";
        else if (p!=0&&r!=0)
        out4 = out4 + "(0)}$$";
        else if (q!=0&&r!=0)
        out4 = out4 + "\\frac{"+q+"w}{"+r+"}}$$";
        else if (p!=0)
        out4 = out4 + "(0)}$$";
        else if (q!=0)
        out4 = out4 + "(∞)}$$";
        else
        out4 = out4 + "(0)}$$";

                 

         document.getElementById("out1").innerHTML = eqn;
         
         var eq = "$${ G(jw)H(jw) = "+numerator2+denominator2;

         document.getElementById("out2").innerHTML = eq;
         
         document.getElementById("out3").innerHTML = numerator3+denominator3;
         
         document.getElementById("out4").innerHTML = out4;
         
         if (cp==1)
         document.getElementById("out5").innerHTML = "$${wcp = "+ wpc+'}$$';
         else
         document.getElementById("out5").innerHTML = "$${wcp = NaN}$$";
         if (cg==1)
         document.getElementById("out6").innerHTML = "$${wcg = "+ wgc+"}$$";
         else
         document.getElementById("out6").innerHTML = "$${wcg = NaN}$$";
        

        if (wpc>=wgc)
        conclusion = "The phase crossover frequency is more than gain crossover frequency. <br> Thus, the system is stable";
        else
        conclusion = "The gain crossover frequency is more than phase crossover frequency. <br> Thus, the system is unstable";
         var j, k;
        
         var ms = window.matchMedia("(max-width:950px)");
         cwidth(ms);
         ms.addListener(cwidth);

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out1"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out2"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out3"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out4"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out5"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out6"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "tanswer"]);
     } else {
         mto = 1;

         document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
         document.getElementById("mrun").disabled = true;
         document.getElementById("mrun").classList.remove('mrunenabled', 'mrundisabled');
         document.getElementById("tanswer").setAttribute("style", "display:none");
         document.getElementById("mrun").classList.add('mrundisabled');
         document.getElementById("matwork").classList.add('mat');
         document.getElementById("matwork").setAttribute("style", "opacity:0.5");
         document.getElementById("matwork").title = "Please enter the values of coeffecients of the equation first";
     }
 };

 function discriminant (a,b,c)
 {
    return b*b-4*a*c;
 }

 function showval() {
     genval("numc", "lc");
     genval("numd", "ld");
     genval("dena", "lp");
     genval("denb", "lq");
     genval("denc", "lr");
 };

 function genval(idofinput, idofspan) {
     var x;
     x = document.getElementById(idofinput).value;
     //var x1 = x.toFixed(2);
     document.getElementById(idofspan).innerHTML = x;
 };

 var lc = 1;

 function runprog(i) {
     lc = lc + 1;
     if (lc <= 6)
         highlightline(lc);
     else {
         document.getElementById("out6").setAttribute("style", "display:block;");
         document.getElementById("fconclusions").innerHTML = conclusion;
         document.getElementById("line6").setAttribute("style", "color:black;");
         document.getElementById("mrun").disabled = true;
         var ms = window.matchMedia("screen and (max-width:950px)");
        //  for (let i=1;i<4;i++)
        //  {
        //   let m = "tabm"+i;
        //   let a = "taba"+i;
        //   document.getElementById(m).setAttribute("style", "color:black");
        //   document.getElementById(a).setAttribute("style", "color:black");          
        //  }
         
         
         widthcheck(ms);
         ms.addListener(widthcheck);
         document.getElementById("mrun").disabled = true;
         document.getElementById("mrun").classList.remove("mrunenabled");
         document.getElementById("mrun").classList.add("mrundisabled");

         
     }
 };

 function cwidth(ms) {

     if (ms.matches) {
         var chartplot1 = document.getElementById("chartmine1").getContext("2d");
         var chartplot2 = document.getElementById("chartmine2").getContext("2d");
     } else {
         var chartplot1 = document.getElementById("myChart1").getContext("2d");
         var chartplot2 = document.getElementById("myChart2").getContext("2d");
     }
     if (window.ch1 != undefined)
         window.ch1.destroy();
     if (window.ch2 != undefined)
         window.ch2.destroy();
    
     const labelstep = lab_mag;    

     const datastep = {
        labels: labelstep,

        datasets: [{
            label: "Magnitude",
            data: dat_mag,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(0, 255, 136)',
            tension: 0.1
        }]
    };
    window.ch1 = new Chart(chartplot1, {
        type: "line",
        data: datastep,
        options: {
            title: {
                display: true,
                text: "Bode Plot",
                fontSize: 14,
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Frequency (in hz)" !== ' ',
                        labelString: "Frequency (in hz)"
                    },

                }],
                yAxes: [{
                    stacked: false, 
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Gain (in dB)" !== '',
                        labelString: "Gain (in dB)"
                    },


                }]
            },
        }
    });

    const dataimp = {
        labels: lab_mag,

        datasets: [{
            label: "Phase",
            data: dat_ang,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(153, 0, 255)',
            tension: 0.1
        }]
    };
    window.ch2 = new Chart(chartplot2, {
        type: "line",
        data: dataimp,
        options: {
            
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Frequency (in hz)" !== ' ',
                        labelString: "Frequency (in hz)"
                    },

                }],
                yAxes: [{
                    stacked: false, 
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Angle (in degrees)" !== '',
                        labelString: "Angle (in degrees)"
                    },


                }]
            },
        }
    });


 }



 function widthcheck(ms) {
     if (ms.matches){
         document.getElementById("chartcont").setAttribute("style", "display:block;");
     
     }
     else {
         document.getElementById("chartcont1").setAttribute("style", "display:block;");
         
     }
 }

 function highlightline(l) {
    console.log(l);
     var ln = "line" + l;
     var out = "out" + (l-1) ;
     console.log(out);
     document.getElementById(ln).setAttribute("style", "color:blue;");
     document.getElementById(out).setAttribute("style", "display:block;");
     if (lc != 1)
         ln = "line" + (l - 1);
     document.getElementById(ln).setAttribute("style", "color:black;");
 }


 function magnitude(c,d,p,q,r,w)
 {
   var mag = Math.sqrt(d*d+w*w*c*c)/Math.sqrt((r-p*w*w)*(r-p*w*w)+w*w*q*q);
   mag = 20*Math.log10(mag);
   
   return mag;
 }

 function angle(c,d,p,q,r,w)
 {
  if ((c>=0&&q>=0)||(c<=0&&q<=0))
  {
    var ang = Math.atan2(w*c,d)-Math.atan2(w*q,(r-w*w*p));
  }
  else if (c>0&&q<0)
  {
    var ang = Math.atan2(w*c,d)-Math.atan2(w*q,(r-w*w*p)) - 2*Math.PI;
  }
  else
  {
    var ang = Math.atan2(w*c,d)-Math.atan2(w*q,(r-w*w*p)) + 2*Math.PI;
  }
  //var ang = Math.atan2(w*c,d)-Math.atan2(w*q,(r-w*w*p));
  ang = ang*180/3.14;
  
  return ang;
 }

 function bode (c,d,p,q,r)
 {
    lab_mag = [];
    dat_mag = [];
    dat_ang = [];
    for (let i=0.01;i<0.1;i=i+0.01)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }
    for (let i=0.1;i<1;i=i+0.1)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }
    for (let i=1;i<10;i=i+1)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }
    for (let i=10;i<100;i=i+0.10)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }
    for (let i=100;i<1000;i=i+1)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }
    for (let i=1000;i<10000;i=i+10)
    {
        dat_mag.push(magnitude(c,d,p,q,r,i).toFixed(2));
        dat_ang.push(angle(c,d,p,q,r,i).toFixed(2));
        lab_mag.push(i.toFixed(2));
        break;
    }

    for (let i = 0.1; i<100; i+=0.01)
    { console.log(magnitude(c,d,p,q,r,1.52));
      if (magnitude(c,d,p,q,r,i)>-0.1 && magnitude(c,d,p,q,r,i)<0.1)
      {wgc = i.toFixed(2); cg=1}
      //console.log(wgc);
      if (angle(c,d,p,q,r,i)<-179 && angle(c,d,p,q,r,i)>-181)
      {wpc = i.toFixed(2); cp=1;}
      //console.log(wpc);
    }
    if (angle(c,d,p,q,r,0.001)<-179.90&&angle(c,d,p,q,r,0.001)>-180.10)
    wpc = 0;
    else if (angle(c,d,p,q,r,10000)<-179.90&&angle(c,d,p,q,r,10000)>-180.10)
    wgc = Infinity;

 }

