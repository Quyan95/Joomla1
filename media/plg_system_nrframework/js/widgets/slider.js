var handleSliderChange=function(e){var l=e.target.closest(".nrf-slider-wrapper");if(l){var r=e.target.closest(".nrf-slider-range");r&&(l.querySelector(".nrf-slider-value").value=r.value,l.querySelector(".nrf-slider-value").dispatchEvent(new Event("change",{bubbles:!0})));var a=e.target.closest(".nrf-slider-value");a&&(l.querySelector(".nrf-slider-range").value=a.value),function(){var e=l.querySelector(".nrf-slider-range"),r=e.dataset.baseColor,a=e.dataset.progressColor;if(r&&a){var n=e.max?~~(100*(e.value-e.min)/(e.max-e.min)):e.value;e.style.background="linear-gradient(to right, "+a+" 0%, "+a+" "+n+"%, "+r+" "+n+"%, "+r+" 100%)"}}()}};document.addEventListener("change",handleSliderChange),document.addEventListener("input",handleSliderChange);
