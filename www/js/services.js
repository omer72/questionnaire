angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
 .factory('ParseQueries', function($window,$q) {
 	var tokenStore = $window.localStorage;

	function getQuestionCount(){
		var defer = $q.defer();
		var QuestionListObject = Parse.Object.extend("questionList");
		var query = new Parse.Query(QuestionListObject);
		var savedCount = tokenStore.questions_count;
		query.count({
			success: function(count) {
				if (savedCount != count) {
					// The count request succeeded. Show the count
					tokenStore.questions_count = count;
					defer.resolve(true);
				}
			},
			error: function(error) {
				defer.reject(error);
			}
		});
		return defer.promise;
	}
 	function getQuestionList(update,genderType){
 		var defer = $q.defer();
 		if (!update && tokenStore["links_"+genderType] !== undefined){
 			defer.resolve(JSON.parse(tokenStore["links_"+genderType]));
 		}else{

 			var QuestionListObject = Parse.Object.extend("questionList");
 			var query = new Parse.Query(QuestionListObject);
            if (genderType != 'b') {
                query.equalTo("male_female_both", genderType);
            }
 			query.find({
 				success: function(results){
 					var links = [];
 					for (var j = 0; j < results.length; j++) {
 						links.push({"id": results[j].id, "questionnaireId": results[j].attributes.questionnaireId,"subject":results[j].attributes.subject,"gender":results[j].attributes.male_female_both});
 					}
 					tokenStore["links_"+genderType] = JSON.stringify(links);
 					defer.resolve(links);

 				},
 				error : function(err){
 					alert("Error: " + error.code + " " + error.message);
 					defer.reject(err);
 				}
 			});
 		}
 		return defer.promise;
 	}

 	function getQuestionData(questionnaireID,update){

 		var defer = $q.defer();
 		if (!update && tokenStore['questions_'+questionnaireID] !== undefined){
 			defer.resolve(JSON.parse(tokenStore['questions_'+questionnaireID]));
 		}else{
 			var QuestionObject = Parse.Object.extend("questionnaire");
 			var query = new Parse.Query(QuestionObject);
 			query.equalTo("questionnaireId",questionnaireID);
 			query.find({
 				success: function(results){
 					var questions = [];
 					for (var j = 0; j < results.length; j++) {
 						questions.push({"questionnaireId": results[j].attributes.questionnaireId, 
 							"question": results[j].attributes.question,
 							"answer_1":results[j].attributes.answer_1,
 							"answer_1_value":results[j].attributes.answer_1_value,
 							"answer_2":results[j].attributes.answer_2,
 							"answer_2_value":results[j].attributes.answer_2_value,
 							"answer_3":results[j].attributes.answer_3,
 							"answer_3_value":results[j].attributes.answer_3_value,
 							"answer_4":results[j].attributes.answer_4,
 							"answer_4_value":results[j].attributes.answer_4_value,
 							"questionHeader":results[j].attributes.questionHeader});
 					}
 					tokenStore['questions_'+questionnaireID] = JSON.stringify(questions);
 					defer.resolve(questions);

 				},
 				error : function(err){
 					defer.reject(err);
 				}
 			});
 		}
 		return defer.promise;
 	}

 	function getQuestionAnswers(questionnaireID){
 		var defer = $q.defer();
 		if (tokenStore['answers_'+questionnaireID] !== undefined){
 			defer.resolve(JSON.parse(tokenStore['answers_'+questionnaireID]));
 		}else{
	 		var QuestionObject = Parse.Object.extend("answers");
	 		var query = new Parse.Query(QuestionObject);
	 		query.equalTo("questionnaireId",questionnaireID);
	 		query.find({
	 			success: function(results){
	 				var answers = [];
	 				for (var j = 0; j < results.length; j++) {
	 					answers.push(results[j].attributes.answer_1);
	 					answers.push(results[j].attributes.answer_2);
	 					answers.push(results[j].attributes.answer_3);
	 					answers.push(results[j].attributes.answer_4);
	 				}
	 				tokenStore['answers_'+questionnaireID] = JSON.stringify(answers);
	 				defer.resolve(answers);

	 			},
	 			error : function(err){
	 				alert("Error: " + err.code + " " + err.message);
	 				defer.reject(err);
	 			}
	 		});
 		}
 		return defer.promise;
 	}

 	return{
 		getQuestionList : getQuestionList,
 		getQuestionData : getQuestionData,
 		getQuestionAnswers : getQuestionAnswers,
		getQuestionCount : getQuestionCount
 	};
 });