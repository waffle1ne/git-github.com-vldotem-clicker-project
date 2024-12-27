function theme_switch() {
    btn = document.getElementById('theme-btn');
    if (btn.theme === undefined || btn.theme === 'light') {
        btn.theme = 'dark';
        document.body.style.backgroundColor = '#343434';
    } else {
        btn.theme = 'light';
        document.body.style.backgroundColor = '#ffffff';
    }
}