(function($){
	
	/** Configuration Variables */
	var config_launch_data = 'August 15, 2012 00:00:00';
	var config_twitter_username = 'dmsh';
	/** End of Configurations */
	
	/** aisleCounter */
	function aisleCounter() {		
		var austDay = new Date( config_launch_data );
		$( '#countdown' ).countdown({until: austDay, layout: '<span class="dn number">{dn}</span><span class="dl label">{dl}</span> <span class="hn number">{hn}</span><span class="hl label">{hl}</span> <span class="mn number">{mn}</span><span class="ml label">{ml}</span> <span class="sn number">{sn}</span><span class="sl label">{sl}</span>'});		
	}
	
	/** aisleTweet */
	function aisleTweet() {
		$( '.tweet' ).tweet({
            username: config_twitter_username,
            count: 1,
            loading_text: "loading tweets...",
			template: "{text}"
        });		
	}
	
	/**
	 * Subscription Form Logic 
	 */
	
	/** Email Validation */
	function isValidEmail( email ) {
	  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	  return pattern.test( email );
	}
	
	/** Pre Submit Callback */
	function showRequest(formData, jqForm, options) { 
		
		$( '#subscribe-response' ).html( '<div class="response start">Loading...</div>' );
		
		var email = $( '#email' ).val();
		
		if ( !isValidEmail( email ) ) {
			
			$( '#subscribe-response' ).html( '<div class="response error">Please enter a valid email address</div>' );
			return false
		}
		
		return true; 
	}
	 
	/** Post Submit Callback */
	function showResponse(responseText, statusText, xhr, $form)  {	 
	}
	
	/** aisleSubscribe */
	function aisleSubscribe() {
		
		var options = { 
			target:        '#subscribe-response',   // target element(s) to be updated with server response 
			beforeSubmit:  showRequest,  // pre-submit callback 
			success:       showResponse,  // post-submit callback 
	 
			// other available options: 
			//url:       url         // override for form's 'action' attribute 
			//type:      type        // 'get' or 'post', override for form's 'method' attribute 
			//dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
			clearForm: true,        // clear all form fields after successful submit 
			resetForm: true,        // reset the form after successful submit 
	 
			// $.ajax options can be used here too, for example: 
			timeout:   3000 
		}; 
	 
		// bind form using 'ajaxForm' 
		$( '#subscribe-form' ).ajaxForm(options);
				
	}
	
	/** jQuery Document Ready */
	$(document).ready(function(){
		aisleCounter();
		aisleTweet();
		aisleSubscribe();
	});

	/** jQuery Windows Load */
	$(window).load(function(){
	});	

})(jQuery);