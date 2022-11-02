use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent, SystemTrayMenuItem};
use tauri::Manager;

fn main() {
    
  let connect = CustomMenuItem::new("connect".to_string(), "Connect");
  let settings = CustomMenuItem::new("settings".to_string(), "Settings");
  let show = CustomMenuItem::new("show".to_string(), "Hide");
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");

  let tray_menu = SystemTrayMenu::new()
  .add_item(connect)
  .add_item(settings)
  .add_native_item(SystemTrayMenuItem::Separator)
  .add_item(show)
  .add_item(quit);

  tauri::Builder::default()
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => {
        let item_handle = app.tray_handle().get_item(&id);
        match id.as_str() {
          "connect" => {
            // connect vpn/disconnect

            item_handle.set_title("Disconnect").unwrap();
          }

          "settings" => {
            // open settings window or something
          }

          "show" => {
            //toggle show/hide window

            item_handle.set_title("Show").unwrap();
          }

          "quit" => {
            // ...quit
          }
          _ => {}
        }
      }
      _ => {}
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