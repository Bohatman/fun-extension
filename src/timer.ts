import * as vscode from 'vscode';
var intervalId: NodeJS.Timeout; 
var timeoutId: NodeJS.Timeout;
var lastInput: number;
let configBreakTime = vscode.workspace.getConfiguration("fun").get("breaktime");
var breaktime:number = configBreakTime === undefined ? 1 :  Number(configBreakTime);
var timerBar: vscode.StatusBarItem;
var iconBar: vscode.StatusBarItem;
iconBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
timerBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
vscode.commands.registerCommand('fun-extension.enterTime', () => {
    vscode.window.showInputBox({
        prompt: "ตั้งเวลา",
        placeHolder: 'ใส่จำนวนนาที',
        value: "10",
        validateInput: (minutesStr) => {
            let minutes = Number(minutesStr);
            if(isNaN(minutes)){
                return '❌❌❌ กรอกได้แค่ตัวเลขน้า ❌❌❌';
            }
            return undefined;
        }
    }).then(minutesStr => {
        let minutes = Number(minutesStr);
        setTimer(minutes, "👨‍💻");
    });
});
timerBar.text = "เริ่มจับเวลา";
timerBar.command = "fun-extension.enterTime";
timerBar.show();

function setTimer(timerMinutes: number, icon: string){
	if(!(intervalId === undefined)){
		clearInterval(intervalId);
		clearTimeout(timeoutId);
	}
	iconBar.text = icon;
	iconBar.show();
	lastInput = timerMinutes;
	let count = timerMinutes * 60;
	intervalId = setInterval(()=>{
		count = count - 1;
		let minutes = Math.floor(count / 60);
		let seconds = count % 60;
		timerBar.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		timerBar.show();
	}, 1000);
	timeoutId = setTimeout(()=>{
		iconBar.hide();
		timerBar.text = "หมดเวลาแล้ว";
		timerBar.show();
		clearInterval(intervalId);
		if(icon === "👨‍💻"){
			vscode.window.showInformationMessage("พักหน่อยไหม หรือจะทำงานต่อเลย", {
				modal: true
			}, `อยากพักแล้ว (${breaktime} นาที)`, `ไม่เอาจะทำงานต่อกำลังมัน (${lastInput} นาที)`).then((result) => {
				if(result === undefined){
					vscode.window.showInformationMessage("ไปแล้วหรอ กลับมาใช้งานได้อีกทุกเมื่อเลยนะ");
				}else if(result === `อยากพักแล้ว (${breaktime} นาที)`){
					setTimer(breaktime, "🧘‍♂️");
				}else if(result === `ไม่เอาจะทำงานต่อกำลังมัน (${lastInput} นาที)`) {
					setTimer(lastInput, "👨‍💻");
				}
			});
		}else{
			vscode.window.showInformationMessage("พร้อมทำงานหรือยัง หรืออยากพักต่ออีกนิด", {
				modal: true
			}, "พร้อมทำงานแล้ว", `ยังไม่หายเหนื่อยเลย (${breaktime} นาที)`).then((result) => {
				if(result === undefined){
					vscode.window.showInformationMessage("ไปแล้วหรอ กลับมาใช้งานได้อีกทุกเมื่อเลยนะ");
				}else if(result === "พร้อมทำงานแล้ว"){
					vscode.commands.executeCommand("fun-extension.enterTime");
				}else if(result === `ยังไม่หายเหนื่อยเลย (${breaktime} นาที)`) {
					setTimer(breaktime, "🧘‍♂️");
				}
			});
		}
	}, timerMinutes * 60 * 1000);
}
export {iconBar,timerBar};