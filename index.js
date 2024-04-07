const terminal = document.querySelector('.terminal');
const output = terminal.querySelector('.output');
const inputLine = terminal.querySelector('.input-line');
const commandLine = terminal.querySelector('#command-line');

const shutdownText = `systemd[1]: Stopping target Timers.
systemd[1]: Stopping target Sound Card.
systemd[1]: Stopping target Swap.
systemd[1]: Stopping target Local File Systems (Pre).
systemd[1]: Stopping target Local File Systems.
systemd[1]: Stopped target Remote File Systems.
systemd[1]: Stopped target Swap.
systemd[1]: Stopped target Local File Systems (Pre).
systemd[1]: Stopped target Local File Systems.
systemd[1]: Stopped target Timers.
The system will shutdown now!`;




function outputCommand() {
    const input = commandLine.value;
    const outputString = `\n> ${input}\n`;
    output.innerHTML += outputString;
    commandLine.value = '';
    handleCommand(input);
}

function handleCommand(command) {
    if (command === 'help') {
        const helpText = `Available commands:\n
        help - display this.\n
        clear - clears the screen.\n
        whoami - information about the user.\n
        about - information about us.\n
        projects - our projects.\n
        contact - our info.\n
        poweroff - turns off the computer.\n`
        output.innerHTML += helpText;
    } else if (command === 'clear') {
        output.innerHTML = '';
    } else if (command === 'whoami') {
        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  		output.innerHTML += "root\nIP Address: " + data.ip
	});

    } else if (command === 'about') {
        output.innerHTML += "we are fedded.icu, a group of people with different programming skillsets."
    } else if (command === 'projects') {
        output.innerHTML += "currently, we don't have any projects. stay tuned."
    } else if (command === 'contact') {
        output.innerHTML += "if you need to contact us, find it out yourself."
    } else if (command === 'poweroff') {
        output.innerHTML += shutdownText;
        delete inputLine;
setTimeout(function() {
            window.close();
        }, 1000);
                
    } else {
        const errorText = `Command '${command}' not found. Type 'help' for a list of available commands.`;
        output.innerHTML += errorText;
    }
}

commandLine.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        outputCommand();
    }
});

commandLine.focus();
