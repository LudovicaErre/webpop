(function (){
	('#visible').click(function(){
		('#invisible, #same, #cora, #citation, #cit, #mcqueen, #title, #pose, #crown, #back').toggleClass("show");
	});
});

(function (){
	('#visibletwo').click(function(){
		('#guardian, #sametwo, #corrin, #citationtwo, #cit2, #backtwo').toggleClass("show");
	});
});


//modify text 
const controller = new AbortController();
const el = document.getElementById("visible");
el.addEventListener("click", modifyText, { signal: controller.signal } );

// Change the text
function modifyText() {
  const btn = document.getElementById("visible");
  if (btn.firstChild.nodeValue === "Continue reading") { 
    btn.firstChild.nodeValue = "Close";
  } else {
    btn.firstChild.nodeValue = "Continue reading";
  }
}


//part 2

const controllertwo = new AbortController();
const elem = document.getElementById("visibletwo");
elem.addEventListener("click", modifyTexttwo, { signaltwo: controllertwo.signal } );

// Change the text
function modifyTexttwo() {
  const btntwo = document.getElementById("visibletwo");
  if (btntwo.firstChild.nodeValue === "Continue reading") { 
    btntwo.firstChild.nodeValue = "Close";
  } else {
    btntwo.firstChild.nodeValue = "Continue reading";
  }
}
