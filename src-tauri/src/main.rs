use tauri::{Submenu, Menu, CustomMenuItem, SystemTray, SystemTrayMenu, SystemTraySubmenu, SystemTrayEvent, SystemTrayMenuItem};
use tauri::Manager;

fn main() {
    
  let disconnect = CustomMenuItem::new("disconnect".to_string(), "Disconnect");
  let settings = CustomMenuItem::new("settings".to_string(), "Settings");
  let show = CustomMenuItem::new("show".to_string(), "Hide");
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");

  let auto = CustomMenuItem::new("auto".to_string(), "Auto");
  let us1 = CustomMenuItem::new("US-1".to_string(), "US-1");

  let submenu = SystemTraySubmenu::new("Connect", SystemTrayMenu::new().add_item(auto).add_item(us1));

  let tray_menu = SystemTrayMenu::new()
  .add_item(disconnect)
  .add_submenu(submenu)
  .add_item(settings)
  .add_native_item(SystemTrayMenuItem::Separator)
  .add_item(show)
  .add_item(quit);

  tauri::Builder::default()
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => {
        let item_handle = app.tray_handle().get_item(&id);
        let disconn_handle = app.tray_handle().get_item("disconnect");

        match id.as_str() {
          "disconnect" => {
            let window = app.get_window("main").unwrap();
            
            app.tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/Square310x310Logo.png").to_vec())).unwrap();

            disconn_handle.set_enabled(false).unwrap();
          }

          "auto" => {
            app.tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/check.png").to_vec())).unwrap();
            disconn_handle.set_enabled(true).unwrap();

            // connect vpn

            //submenu.set_title("Disconnect").unwrap();
          }

          "US-1" => {
            app.tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/check.png").to_vec())).unwrap();
            disconn_handle.set_enabled(true).unwrap();

            // connect vpn

            //us1.set_title("Disconnect").unwrap();
          }

          "settings" => {
            // open settings window or something
          }

          "show" => {
            //toggle show/hide window

            let window = app.get_window("main").unwrap();

            //println!("Window is visible: {}", window.is_visible());

            if window.is_visible().is_ok() {
                match window.is_visible() {
                    Ok(t) => {
                        if t {
                            window.hide().unwrap();
                            item_handle.set_title("Show").unwrap();
                        } else {
                            window.show().unwrap();
                            item_handle.set_title("Hide").unwrap();
                        }
                    }
                    Err(_) => {
                        println!("Error getting window visibility");
                    }
                }
            }
          }

          "quit" => {
            // ...quit
          }
          _ => {}
        }
      }
      _ => {}
    })
    .setup(|app| {
        app.tray_handle().get_item("disconnect").set_enabled(false).unwrap();
        Ok(())
    })
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run(|_app_handle, _event| match _event {
        tauri::RunEvent::ExitRequested { api, .. } => {
          api.prevent_exit();
        }
        _ => {}
    });
}