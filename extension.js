
/*
 * Show Desktop from Overview
 * Very small extension which minimizes all windows when you click on an empty space in the windows-overview-mode.
 *
 * Contact:
 * https://github.com/Bazon/ShowDesktopFromOverview/tree/master or bazonbloch@arcor.de
 * Feel free to send improvments!
*/

const Main = imports.ui.main;
const Shell = imports.gi.Shell;

var connectid = null;
var reactiveBefore = null;

function _showDesktop() {
    //TODO: when public, do that by meta_screen_show_desktop();
    
    let activeWorkspace = global.screen.get_active_workspace();
    let tracker = Shell.WindowTracker.get_default();
    let windows = activeWorkspace.list_windows();
    for (let i = 0; i < windows.length; i++) {
           //New in V3&4: tracker.is_window_interesting checks whether this is a real window and not a desktop icon
           if (!windows[i].minimized && (windows[i].get_window_type() == 0) && !(windows[i].get_title().indexOf("Conky") >= 0)) {
	       windows[i].minimize();
           }
    }
}

function _hideOverview() {
    if(Main.overview.viewSelector._activePage == Main.overview.viewSelector._workspacesPage) {
    	_showDesktop();
    }
    Main.overview.hide();
}
function init() {
    reactiveBefore=Main.overview.viewSelector.actor.reactive;
    //normal: false. but maybe set by another extension.
}

function enable() {
    Main.overview.viewSelector.actor.reactive=true;
    connectid = Main.overview.viewSelector.actor.connect('button-press-event', _hideOverview);
}

function disable() {
    //set back to default value which is normally false.
    Main.overview.viewSelector.actor.reactive=reactiveBefore;
    Main.overview.viewSelector.actor.disconnect(connectid);
}
