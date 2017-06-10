use pigfarm;

db.fertilization.drop();
db.relocation.drop();
db.introduction.drop();
db.mother.drop();

db.fertilization.insert({
	"num":"333",
	"pigId":"Y 39-12",
	"motherStatus":"이유모돈",
	"batch":"2산",
	"daysSinceStopBreastFeed":"5일",
	"administration1":"정액1차",
	"administration2":"정액2차",
	"administration3":"정액3차",
	"administrator":"라유",
	"status":"완료"
});

db.fertilization.find().pretty();
