# EditZorro
A JS/Electron-based keyboard profile creator for use with LaunchZorro(https://github.com/MikauSchekzen/LaunchZorro).

## Related
LaunchZorro(https://github.com/MikauSchekzen/LaunchZorro)
Interception Driver(http://www.oblita.com/interception.html)

## Usage
### Rebinding
Click a button on the layout on the bottom half of the window, and then click another button or press a key to rebind the first key to the second.
To cancel a rebind, click the Deselect button on the bottom-right.


### Keymaps
To create a keymap, click the Add Keymap in the top-center of the window. A new keymap should appear where you can set different binds.

Instead of rebinding a key to another key, you can rebind a key to a keymap instead.
Simply click the button corresponding to the key you want to bind to a keymap, and then click one of the keymaps.
This is only possible when editing the first keymap on the list.


### Bind options
There are some bind options which can alter how a bind works with LaunchZorro.

#### Label
Labels are purely cosmetic, and help you keep track of binds.

#### Ctrl, Shift and Alt
Presses and releases these keys with the main target function. Can be automatically set by holding it during a rebind.

#### Rapidfire
Rapidfire presses and releases a key every amount of miliseconds as set in the rapidfire field.

#### Toggle
Toggled binds stay down until pressed a second time.

#### JRA
JRA stands for Japanese Run Assist, and pretty much means that binds with this flag are pressed twice in succession on a physical press, to assist with games that require you to double-tap a movement to run.


### Mice and LHC selector
These are purely helper functionalities, and show an interactive grid of functions equal what I set on my mice and left-handed controllers. You can change these layouts by editing static/data/buttons.json
