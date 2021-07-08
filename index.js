var application = angular.module("application", []);

application.controller("controller", 
	
	function($scope) {
		
		$scope.submitted = false;
		$scope.alert = {class:"alert-info", message:"الرجاء ادخال المعلومات المطلوبة"};
		$scope.student = new Object();
		
		$scope.saveStudent = function(){
			
			window.scrollTo(0, 0);
			
			var result = isValidForm();
			
			if(result == null){
				
				$scope.alert = {class:"alert-warning", message:"يرجى الانتظار"};
				
				$scope.submitted = true;
				
				firebase.database().ref("students").child($scope.student.mobile).set($scope.student).then(function(){
					
					$scope.alert = {class:"alert-success", message:"تم حفظ معلومات الطالب بنجاح"};
					
					$scope.$digest();
					
				}).catch(function(error){
					
					$scope.submitted = false;
					
					$scope.alert = {class:"alert-danger", message:error};
					
					$scope.$digest();
				});
					
			}else{
				
				$scope.alert = {class:"alert-danger", message:result};
			}
		}
	}
);