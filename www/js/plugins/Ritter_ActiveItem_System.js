/*:
*
* @plugindesc Active Item Toggle and Use System for ABS games.
*
* @author Ritter (https://notritter.itch.io/)
*
* -------------------------------------------
* Plugin Parameters
* -------------------------------------------
* 
* @param ------------------------------------
* @desc don't look in here!
*
* @param Use On/Off Switch?
* @type boolean
* @on YES
* @off NO
* @desc Whether the system uses an On/Off gameSwitch.
* @default true
* 
* @param On/Off Switch ID
* @type number
* @desc  Game Switch # used to turn on/off the System.
* (HUD switch maybe?)
* @default 0
* 
* @param ------------------------------------
* @desc don't look in here!
* 
* @param Active Item IDs
* @desc Database Item IDs of Items to use. Separate with spaces.
* ~Example: 4 8 15 16 23 42
* @default 0
* 
* @param ------------------------------------
* @desc don't look in here!
*
* @param Use Toggle Button Binds?
* @type boolean
* @on YES
* @off NO
* @desc Option to use button bindings below.
* Disable if using Button Common Events instead.
* @default true
* 
* @param Toggle Forward Button
* @desc Default Button used to toggle forward
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param Toggle Backward Button
* @desc Default Button used to toggle backward
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param Use Active Item Button
* @desc Default Button to use active item
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param ------------------------------------
* @desc don't look in here!
*
* @param Yanfly Keyboard Config Compatibility 
* 
* @param ------------------------------------
* @desc don't look in here!
*
* @param Toggle Forward Button Name
* @desc Name which will show in Config
* @default Item Toggle+
*
* @param Toggle Forward Button default WASD bind
* @desc Default button to use when WASD default is used.
* Regular default value is assigned to value set above.
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param Toggle Backward Button Name
* @desc Name which will show in Config
* @default Item Toggle-
*
* @param Toggle Backward Button default WASD bind
* @desc Default button to use when WASD default is used.
* Regular default value is assigned to value set above.
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param Use Item Button Name
* @desc Name which will show in Config
* @default Use Item
*
* @param Use Item Button default WASD bind
@ desc Default button to use when WASD default is used.
* Regular default value is assigned to value set above.
* @type select
* @option A
* @value 65, a
* @option B
* @value 66, b
* @option C
* @value 67, c
* @option D
* @value 68, d
* @option E
* @value 69, e
* @option F
* @value 70, f
* @option G
* @value 71, g
* @option H
* @value 72, h
* @option I
* @value 73, i
* @option J
* @value 74, j
* @option K
* @value 75, k
* @option L
* @value 76, l
* @option M
* @value 77, m
* @option N
* @value 78, n
* @option O
* @value 79, o
* @option P
* @value 80, p
* @option Q
* @value 81, q
* @option R
* @value 82, r
* @option S
* @value 83, s
* @option T
* @value 84, t
* @option U
* @value 85, u
* @option V
* @value 86, v
* @option W
* @value 87, w
* @option X
* @value 88, x
* @option Y
* @value 89, y
* @option Z
* @value 90, z
* @option 0
* @value 48, 0
* @option 1
* @value 49, 1
* @option 2
* @value 50, 2
* @option 3
* @value 51, 3
* @option 4
* @value 52, 4
* @option 5
* @value 53, 5
* @option 6
* @value 54, 6
* @option 7
* @value 55, 7
* @option 8
* @value 56, 8
* @option 9
* @value 57, 9
* @option num0
* @value 96, num0
* @option num1
* @value 97, num1
* @option num2
* @value 98, num2
* @option num3
* @value 99, num3
* @option num4
* @value 100, num4
* @option num5
* @value 101, num5
* @option num6
* @value 102, num6
* @option num7
* @value 103, num7
* @option num8
* @value 104, num8
* @option num9
* @value 105, num9
* @option num /
* @value 111, numDivide
* @option num *
* @value 106, numTimes
* @option num -
* @value 109, numMinus
* @option num +
* @value 107, numPlus
* @option num .
* @value 110, numPeriod
* @option ~ Tilde
* @value 192, tilde
* @option - Minus
* @value 189, minus
* @option = Equal
* @value 187, equal
* @option [ Forward Bracket
* @value 219, foreBrack
* @option ] Backward Bracket
* @value 221, backBrack
* @option \ Backslash
* @value 220, backSlash
* @option ; Semicolon
* @value 186, semicolon
* @option " Quote
* @value 222, quote
* @option Enter
* @value 13, enter
* @option Shift
* @value 16, keyShift
* @option , Comma
* @value 188, comma
* @option . Period
* @value 190, period
* @option / Forward Slash
* @value 191, foreSlash
* @option Spacebar
* @value 32, space
* @option Insert
* @value 45, ins
* @option Delete
* @value 46, del
* @option Home
* @value 36, home
* @option End
* @value 35, end
* @option Page Up
* @value 33, pageUp
* @option Page Down
* @value 34, pageDown
*
* @param ------------------------------------
* @desc don't look in here!
* 
* @param Show Pop Up Display?
* @type boolean
* @on Yes
* @off No
* @desc Do you want the Pop Up Display on Item Toggle?
* @default true
*
* @param Use Image Files?
* @type boolean
* @on Images
* @off Icons
* @desc Choose between using Images or Icons for Pop Up Display.
* true = images, false = icons.
* @default true
*
* @param Pop Up Duration
* @type number
* @desc Number of frames the Pop Up will last.
* @default 60
*
* @param Pop Up Fade Speed
* @type number
* @desc How fast the Pop Up fades out.
* Fade begins after Pop Up Duration ends.
* @default 5
*
* @param Pop Up Y Offset
* @type Number
* @desc How far above the players head the Pop up
* appears. Increase number to move up, Decrease for down.
* @default 108
*
* @param Pop Up X Offset
* @type Number
* @desc Spacing between Previous, Next, and Current
* Items. Use a Positive Number.
* @default 48
*
* @param Active Item Popup Size
* @type number
* @decimals 2
* @desc Size of the active item pop up.
* Size 1 is full size. 1.5 is 150% bigger.
* @default 1
*
* @param Next/Previous Item Popup Size
* @type number
* @decimals 2
* @desc Size of the Next/Previous Items Pop Up.
* Size 1 is full size. .75 is 75% smaller
* @default .75
*
* @param ------------------------------------
* @desc don't look in here!
* 
* @param Toggle SE Filename
* @type file
* @dir audio/se
* @desc Filename of sound effect to play during item toggle.
* @default Equip2
*
* @param Toggle SE Volume
* @type number
* @max 100
* @min 0
* @desc Volume of sound effect on toggle.
* 100 = Max volume. 0 = Sweet silence.
* @default 90
*
* @param Toggle SE Pitch
* @desc Pitch of sound effect on toggle.
* @type number
* @max 150
* @min 50
* 100 reccomended.
* @default 100
*
* @param Toggle SE Pan
* @desc Pan of sound effect on toggle.
* @type number
* @max 100
* @min -100
* @default 0
*
* @param ------------------------------------
* @desc don't look in here!
*
* @param Fail SE Filename
* @type file
* @dir audio/se
* @desc Filename of sound effect to play when an 
* item toggle or item use fails.
* @default Cancel1
*
* @param Fail SE Volume
* @type number
* @max 100
* @min 0
* @desc Volume of sound effect on item toggle or use fail.
* @default 90
*
* @param Fail SE Pitch
* @desc Pitch of sound effect on item toggle or use fail.
* @type number
* @max 150
* @min 50
* 100 reccomended.
* @default 100
*
* @param Fail SE Pan
* @desc Pan of sound effect on item toggle or use fail.
* @type number
* @max 100
* @min -100
* @default 0
*
* @param ------------------------------------
* @desc don't look in here!
*
* @param Developer Mode
* @type boolean
* @on On
* @off Off
* @desc Developer Mode to find proper Popup Item Parameters.
* @default false
*
* -------------------------------------------
* Help
* -------------------------------------------
*
* @help
*
* Active Item System for toggling through and using items
* on the game map! Built for ABS games, compatibile with
* any game! (I hope, let me know of any issues).
*
* Use Images or Icons for the Toggle Item Pop Up Display.
*
* Optional script calls if using Yanfly Button Common Events
* instead of this plugins button binding:
*
* Place the following script calls in a common event and call it
* using Yanfly Button Common Event Plugin.
*
* Active Item System Script Calls:
* 
* Ritter.ActiveItem_System.toggle("forward"); 
* 
*    Cycles through items in a forward direction.
*
* Ritter.ActiveItem_System.toggle("backward");
*
*    Cycles through items in a backward direction.
*
*
* Ritter.ActiveItem_System.useItem();
*
*    Uses the active item.
* 
*
* -------------------------------------------
* 
* Use the following to retrieve active item data for hud
* or other purposes where you need the active item values.
*
* Ritter.ActiveItem; // returns the ID # of the active item.
*
* Ritter.ActiveQuantity; // returns the quantity # of the active item.
*
* Ritter.PrevItem; // returns the ID # of the previous item in cycle.
*
* Ritter.NextItem; // returns the ID # of the next item in cycle.
*
*
* -------------------------------------------
*
* Developer Mode!
*
* Find your desired offsets and scale for Item Pop Up Display using Developer
* Mode! Enable Developer Mode within the plugin parameters and play test.
* Developer mode sets numpad keys to control the position and scale of the 
* Pop Up display.
*
* numpad 2: Adjusts the Y offset of the Popup Display (moves down)
* numpad 8: Adjusts the Y offset of the Popup Display (moves up)
* numpad 4: Adjusts the X offset of the Popup Display (squeezes images closer)
* numpad 6: Adjusts the X offset of the Popup Display (pushes images apart)
* numpad +: Adjusts the scale of Next/Previous Items (increases size)
* numpad -: Adjusts the scale of Next/Previous Items (decreases size)
* numpad /: Adjusts the scale of Active Item (increases size)
* numpad *: Adjusts the scale of Active Item (decreases size)
*
* Once you find the positioning and scale you like take the values shown on 
* screen and enter them into the corresponding Plugin Parameters. 
*
* Don't forget to disable Developer mode when done!
*
* -------------------------------------------
*
* Terms of Use:
* Can be used in Commercial and Non-Commercial games if purchased.
* Personal edits are allowed for use in your game,
* don't claim credit for this plugin.
* Don't post this plugin elsewhere, modified or otherwise.
* Don't remove my name from Author.
* I am not liable for any problems you may encounter while
* using this plugin, though I may, or may not, be available
* for support on RPG Maker Forums.
* I will not support edits to the code.
* Please credit me in your games credits as: Craig "Ritter" B.
*
*/

// -----------------------------------------------------------------
// CODE STUFF
// -----------------------------------------------------------------

var Imported = Imported || {};
Imported.Ritter_ActiveItem_System = true;

var Ritter = Ritter || {};          // Ritter main object
Ritter.ActiveItem_System = Ritter.ActiveItem_System || {};        // Ritter stuff
Ritter.Params = Ritter.Params || {}; 	// Ritter parameter stuff

Ritter.SetupParameters = function() {
	var parameters = PluginManager.parameters('Ritter_ActiveItem_System');
	Ritter.Params.useswitch = eval(String(parameters["Use On/Off Switch?"]));
	Ritter.Params.mainswitch = Number(parameters["On/Off Switch ID"]);
	Ritter.Params.activeids = String(parameters['Active Item IDs']);
	Ritter.Params.activeids = Ritter.Params.activeids.split(' ');
	for (var i = 0; i < Ritter.Params.activeids.length; i++) {
		Ritter.Params.activeids[i] = Number(Ritter.Params.activeids[i]);
	}
	Ritter.Params.useImgs = eval(String(parameters["Use Image Files?"]));
	Ritter.Params.showPopup = eval(String(parameters["Show Pop Up Display?"]));
	
	// Process Button Selections
	Ritter.Params.useButtonsOnOff = eval(String(parameters["Use Toggle Button Binds?"]));
	Ritter.Params.togForButton = String(parameters['Toggle Forward Button']);
	Ritter.Params.togForButton = Ritter.Params.togForButton.split(', ');
	Ritter.Params.togForButton[0] = Number(Ritter.Params.togForButton[0]);
	Ritter.Params.togBackButton = String(parameters['Toggle Backward Button']);
	Ritter.Params.togBackButton = Ritter.Params.togBackButton.split(', ');
	Ritter.Params.togBackButton[0] = Number(Ritter.Params.togBackButton[0]);
	Ritter.Params.useItemButton = String(parameters['Use Active Item Button']);
	Ritter.Params.useItemButton = Ritter.Params.useItemButton.split(', ');
	Ritter.Params.useItemButton[0] = Number(Ritter.Params.useItemButton[0]);
	
	// Process WASD Button Binds

	Ritter.Params.wasdtogForButton = String(parameters['Toggle Forward Button default WASD bind']);
	Ritter.Params.wasdtogForButton = Ritter.Params.wasdtogForButton.split(', ');
	Ritter.Params.wasdtogForButton[0] = Number(Ritter.Params.wasdtogForButton[0]);
	Ritter.Params.wasdtogBackButton = String(parameters['Toggle Backward Button default WASD bind']);
	Ritter.Params.wasdtogBackButton = Ritter.Params.wasdtogBackButton.split(', ');
	Ritter.Params.wasdtogBackButton[0] = Number(Ritter.Params.wasdtogBackButton[0]);
	Ritter.Params.wasduseItemButton = String(parameters['Use Item Button default WASD bind']);
	Ritter.Params.wasduseItemButton = Ritter.Params.wasduseItemButton.split(', ');
	Ritter.Params.wasduseItemButton[0] = Number(Ritter.Params.wasduseItemButton[0]);

	Ritter.Params.togForName = String(parameters['Toggle Forward Button Name']);
	Ritter.Params.togBackName = String(parameters['Toggle Backward Button Name']);
	Ritter.Params.useItemName = String(parameters['Use Item Button Name']);
	
	Ritter.Params.popupDuration = Number(parameters['Pop Up Duration']);
	Ritter.Params.popupFadeSpeed = Number(parameters['Pop Up Fade Speed']);
	Ritter.Params.popupYoffset = Number(parameters['Pop Up Y Offset']);
	Ritter.Params.popupXoffset = Number(parameters['Pop Up X Offset']);
	Ritter.Params.activeScale = Number(parameters["Active Item Popup Size"]);
	Ritter.Params.npScale = Number(parameters["Next/Previous Item Popup Size"]);
	
	Ritter.Params.toggleSEfilename = String(parameters["Toggle SE Filename"]);
	Ritter.Params.toggleSEvolume = Number(parameters["Toggle SE Volume"]);
	Ritter.Params.toggleSEpitch = Number(parameters["Toggle SE Pitch"]);
	Ritter.Params.toggleSEpan = Number(parameters["Toggle SE Pan"]);
	Ritter.Params.failSEfilename = String(parameters["Fail SE Filename"]);
	Ritter.Params.failSEvolume = Number(parameters["Fail SE Volume"]);
	Ritter.Params.failSEpitch = Number(parameters["Fail SE Pitch"]);
	Ritter.Params.failSEpan = Number(parameters["Fail SE Pan"]);
	
	Ritter.Params.devMode = eval(String(parameters["Developer Mode"]));
};
Ritter.SetupParameters();

(function() {

// 实现在游戏中随时修改道具数组
Ritter.ActiveItem_System.updateActiveIds = function(newIds) {
    Ritter.Params.activeids = newIds.map(Number);  // 确保所有ID都是数字类型
    Ritter.ActiveItem_System.refreshActiveItems();
};

Ritter.ActiveItem_System.refreshActiveItems = function() {
    if (!Ritter.Params.activeids.includes(Ritter.ActiveItem)) {
        Ritter.ActiveItem = Ritter.Params.activeids[0] || null;
        Ritter.ActiveQuantity = Ritter.ActiveItem ? $gameParty.numItems($dataItems[Ritter.ActiveItem]) : 0;
    }
    $gameMap.requestRefresh();  // 请求地图刷新，确保所有变化都被应用
    //if (Ritter.Params.showPopup) {
       // Ritter.ActiveItem_System.HudCycle();  // 如果启用了弹出显示，更新HUD
   // }
};


// Script call to use on both toggle button press.

Ritter.ActiveItem_System.toggle = function(direction) {
	QJ.MPMZ.tl.ex_playerItemRefresh();
	direction = direction.toLowerCase();
	if (Ritter.Params.useswitch) {
		if (!$gameSwitches.value(Ritter.Params.mainswitch)) return false;
	};
	
	var Ids = Ritter.Params.activeids;
	var ActiveIndex = Ids.indexOf(Ritter.ActiveItem);
	var end = Ids.length - 1;
	
	if (direction.toLowerCase() == "forward") {
		var next = Ritter.ActiveItem_System.forward(Ids, ActiveIndex, end);
	};
	
	if (direction.toLowerCase() == "backward") {
		var next = Ritter.ActiveItem_System.backward(Ids, ActiveIndex, end);
	};
	
	if (next == -1) {
		Ritter.ActiveItem_System.errorSE();
		return false;
	};
	
	if (next >= 0) { 
		Ritter.ActiveItem = Ids[next];
		Ritter.ActiveQuantity = $gameParty._items[Ids[next]];
		Ritter.ActiveItem_System.toggleSE();
		if (Ritter.Params.showPopup) {
			Ritter.popupActive = true;
			Ritter.ActiveItem_System.HudCycle();
		}
		return;
	};
};


// Finds the next available Active Item going forward.

Ritter.ActiveItem_System.forward = function(Ids, ActiveIndex, end) {
	var loopCount = 0;
	var start = 0;
	
	for (var i = ActiveIndex; i <= end; i++) {
		var quantity = $gameParty._items[Ids[i]];
		loopCount++;
		if (i > ActiveIndex && quantity > 0) return i; 
		if (i == end && loopCount < Ids.length) {
			for (var j = start; j < ActiveIndex; j++) {
				quantity = $gameParty._items[Ids[j]];
				if (quantity > 0) return j;
			};
		};
	};
	return -1;
};

// Finds the next available Active Item going backward.

Ritter.ActiveItem_System.backward = function(Ids, ActiveIndex, end) {
	var loopCount = 0;
	var start = 0;
	
	for (var i = ActiveIndex; i >= start; i--) {
		var quantity = $gameParty._items[Ids[i]];
		loopCount++;
		if (i < ActiveIndex && quantity > 0) return i; 
		if (i == start && loopCount < Ids.length) {
			for (var j = end; j > ActiveIndex; j--) {
				quantity = $gameParty._items[Ids[j]];
				if (quantity > 0) return j;
			};
		};
	};
	return -1;
};

// Use the current Active Item if conditions are met.

Ritter.ActiveItem_System.useItem = function() { 
	if (Ritter.Params.useswitch) {
		if (!$gameSwitches.value(Ritter.Params.mainswitch)) return false;
	};
	
	if (!Ritter.ActiveItem || Ritter.ActiveQuantity == 0) { Ritter.ActiveItem_System.errorSE(); return false; };
	
	// 追加判定：水中不允许使用
	if ($gamePlayer._characterName !== "$player" || !$gamePlayer._drill_EASA_enabled) {
		
	let filename = Ritter.Params.failSEfilename;
	let v = Ritter.Params.failSEvolume;
	let p = Ritter.Params.failSEpitch;
	let pn = Ritter.Params.failSEpan;
	AudioManager.playSe({name: filename, volume: v, pitch: p, pan: pn});

            switch (ConfigManager.language) {
                case 0:
                    lang = "当前无法使用道具！";
                    break;
                case 1:
                    lang = "今はアイテム使えない！";
                    break;
                default:
                    lang = "Can’t use item now!";
                    break;
            }
	
    let text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + lang;
    let x =  $gamePlayer.screenX() * $gameScreen.zoomScale();
    let y = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 60 );		
		
		return false;
	}
	
	var item = $dataItems[Ritter.ActiveItem];
	var actorId = $gameParty.leader()._actorId; //$gamePlayer._user.battler._actorId;
	var target = $gameActors.actor(actorId);
	var anim = $dataItems[Ritter.ActiveItem].animationId;
	var effects = $dataItems[Ritter.ActiveItem].effects;
	$gameParty.setLastItem(item);
	for (var i = 0; i < effects.length; i++) {
		var code = $dataItems[Ritter.ActiveItem].effects[i].code;
		var dataId = $dataItems[Ritter.ActiveItem].effects[i].dataId;
		var value1 = $dataItems[Ritter.ActiveItem].effects[i].value1;
		var value2 = $dataItems[Ritter.ActiveItem].effects[i].value2;
		
		switch (code) {
			
			case 11: // gain HP
				if (target.hp === target.mhp && i < 2) { Ritter.ActiveItem_System.errorSE(); return false; };
				if (target.hp < target.mhp) {
				var hpGain = value1 * $gameActors.actor(actorId).mhp + value2;
				target.gainHp(hpGain);
				};
			break;
				
			case 12: // gain MP
				if (target.mp === target.mmp && i < 2) { Ritter.ActiveItem_System.errorSE(); return false; };
				if (target.mp < target.mmp) {
				var mpGain = value1 * $gameActors.actor(actorId).mmp + value2;
				target.gainMp(mpGain);
				};
			break;
				
			case 13: // gain TP
				if (target.tp === target.mtp && i < 2) { Ritter.ActiveItem_System.errorSE(); return false; };
				if (target.tp < target.mtp) {
				var tpGain = value1;
				target.gainTp(tpGain);
				};
			break;
				
			case 21: // add state
				if (target._states.length > 0) {
					for (j = 0; j < target._states.length; j++) {
						if (target._states[j] === dataId && i < 2) { Ritter.ActiveItem_System.errorSE(); return false; };
					};
				};
				target.addState(dataId);
			break;
				
			case 22: // remove state
				var end = target._states.length - 1;
				if (target._states.length > 0) {
					for (j = 0; j < target._states.length; j++) {
						if (target._states[j] === dataId) { target.removeState(dataId); };
						if (j === end && target._states[j] !== dataId && i < 2) { Ritter.ActiveItem_System.errorSE(); return false; };
					};
				};
			break;
			/*  These seemed useless for active items as buffs are turn based.	
				leaving the code here in case they end up being used in the future.
			
			case 31: 
				target.addBuff(dataId, value1);
			break;
				
			case 32: 
				target.addDebuff(dataId, value1);
			break;
				
			case 33: 
				target.removeBuff(dataId);
			break;
				
			case 34: 
				target.removeDebuff(dataId);
			break;
			*/
			
			case 44:
				$gameParty._targetActorId = $gameParty.leader()._actorId;
				$gameTemp.reserveCommonEvent(dataId);
			break;
		};
	};
	//$gameActors.actor(actorId).consumeItem($dataItems[Ritter.ActiveItem]);
	Ritter.ActiveItem_System.hideActiveItemPopup();
	$gamePlayer.requestAnimation(anim);	
};

Ritter.ActiveItem_System.hideActiveItemPopup = function() {
    if (Spriteset_Map.prototype._currentItem) {
        Spriteset_Map.prototype._currentItem.opacity = 0;
        Spriteset_Map.prototype._previousItem.opacity = 0;
        Spriteset_Map.prototype._nextItem.opacity = 0;
        Spriteset_Map.prototype._activeItemName.opacity = 0;
    }
    //$gameSystem._activeItem = false; // 确保不再显示道具栏
    //Ritter.popupActive = false;      // 关闭弹出状态
	Ritter.ActiveItem_System._wait = 0; // 重置等待时间
};

// Sound effect to play when item toggle success.

Ritter.ActiveItem_System.toggleSE = function() {
	var filename = Ritter.Params.toggleSEfilename;
	var v = Ritter.Params.toggleSEvolume;
	var p = Ritter.Params.toggleSEpitch;
	var pn = Ritter.Params.toggleSEpan;
	AudioManager.playSe({name: filename, volume: v, pitch: p, pan: pn});
};

// Sound effect to play when item toggle or item use fail.

Ritter.ActiveItem_System.errorSE = function() {
	var filename = Ritter.Params.failSEfilename;
	var v = Ritter.Params.failSEvolume;
	var p = Ritter.Params.failSEpitch;
	var pn = Ritter.Params.failSEpan;
	AudioManager.playSe({name: filename, volume: v, pitch: p, pan: pn});

            switch (ConfigManager.language) {
                case 0:
                    lang = "没有可用的道具！";
                    break;
                case 1:
                    lang = "アイテムなし！";
                    break;
                default:
                    lang = "No usable items!";
                    break;
            }
	
    var text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + lang;
    var x =  $gamePlayer.screenX() * $gameScreen.zoomScale();
    var y = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 60 );
	
};

// Show Active Item cycle above players head on toggle.

Ritter.ActiveItem_System.HudCycle = function() {
    if (Ritter.popupActive === true) {
        var Ids = Ritter.Params.activeids;  // 数组中存放所有注册的道具 ID
        var count = Ids.length;
        // 如果当前没有设置，则默认取第一个
        if (!Ritter.ActiveItem && count > 0) {
            Ritter.ActiveItem = Ids[0];
        }
        var ActiveIndex = Ids.indexOf(Ritter.ActiveItem);
        if (ActiveIndex < 0) ActiveIndex = 0;
        
        // 为了让轮盘只显示实际存在的道具，而不是循环取值，
        // 当注册的道具数量不足时，我们采用条件判断，缺失项置为 null
        Ritter.PrevItem2 = (count >= 3 && ActiveIndex - 2 >= 0) ? Ids[ActiveIndex - 2] : null;
        Ritter.PrevItem   = (count >= 2 && ActiveIndex - 1 >= 0) ? Ids[ActiveIndex - 1] : null;
        // 当前道具必有
        // Ritter.ActiveItem 已经存在
        Ritter.NextItem   = (count >= 2 && ActiveIndex + 1 < count) ? Ids[ActiveIndex + 1] : null;
        Ritter.NextItem2  = (count >= 3 && ActiveIndex + 2 < count) ? Ids[ActiveIndex + 2] : null;
        
        $gameSystem._activeItem = true;
        this._wait = Ritter.Params.popupDuration;
    }
};


//SPRITESET MAP SETUP

var Ritter_ActiveItem_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Ritter_ActiveItem_Game_System_initialize.call(this);
	this._activeItem = false; // turns true if active item popup displaying.
};

var Ritter_ActiveItem_Spriteset_Map_Update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	Ritter_ActiveItem_Spriteset_Map_Update.call(this);
	if ($gameSystem._activeItem) { this.updateActiveItem(); };
	if (Ritter.Params.devMode) { this.devUpdate(); };
};

var Ritter_ActiveItem_Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    Ritter_ActiveItem_Spriteset_Map_createUpperLayer.call(this);
	this.createActiveItems();
	if (Ritter.Params.devMode) this.createDevText();
};

Spriteset_Map.prototype.createActiveItems = function() {
    // 当前道具
    this._currentItem = new Sprite();
    this._currentItem.scale.x = Ritter.Params.activeScale;
    this._currentItem.scale.y = Ritter.Params.activeScale;
    this._currentItem.anchor.set(0.5, 0.5);

    // 前一个道具（距离较近）
    this._previousItem = new Sprite();
    this._previousItem.scale.x = Ritter.Params.npScale;
    this._previousItem.scale.y = Ritter.Params.npScale;
    this._previousItem.anchor.set(0.5, 0.5);

    // 后一个道具（距离较近）
    this._nextItem = new Sprite();
    this._nextItem.scale.x = Ritter.Params.npScale;
    this._nextItem.scale.y = Ritter.Params.npScale;
    this._nextItem.anchor.set(0.5, 0.5);

    // 新增：前二个道具
    this._previousItem2 = new Sprite();
    this._previousItem2.scale.x = Ritter.Params.npScale;
    this._previousItem2.scale.y = Ritter.Params.npScale;
    this._previousItem2.anchor.set(0.5, 0.5);

    // 新增：后二个道具
    this._nextItem2 = new Sprite();
    this._nextItem2.scale.x = Ritter.Params.npScale;
    this._nextItem2.scale.y = Ritter.Params.npScale;
    this._nextItem2.anchor.set(0.5, 0.5);

    // 下面根据你是否使用图片（useImgs）来加载默认图像
    if (!Ritter.Params.useImgs) {
        var bmp = ImageManager.loadSystem("IconSet_large");
        this._currentItem.bitmap = bmp;
        this._previousItem.bitmap = bmp;
        this._nextItem.bitmap = bmp;
        this._previousItem2.bitmap = bmp;
        this._nextItem2.bitmap = bmp;
        this._currentItem.opacity = 0;
        this._previousItem.opacity = 0;
        this._nextItem.opacity = 0;
        this._previousItem2.opacity = 0;
        this._nextItem2.opacity = 0;
    }
    // 将所有精灵添加到容器中
    this.addChild(this._previousItem2);
    this.addChild(this._previousItem);
    this.addChild(this._currentItem);
    this.addChild(this._nextItem);
    this.addChild(this._nextItem2);

    // 额外显示道具名称的精灵保持不变
    this._activeItemName = new Sprite(new Bitmap(200, 48));
    this._activeItemName.bitmap.fontSize = 16;
    this._activeItemName.bitmap.fontFace = 'FOT-NewCinemaA Std D';	
    this._activeItemName.opacity = 0; 
    this.addChild(this._activeItemName);
};


Spriteset_Map.prototype.updateActiveItem = function() {
    // 如果等待时间大于 0，则更新各个图标和道具名称的显示
    if (Ritter.ActiveItem_System._wait > 0) {

        // 更新【当前道具】显示
        if (Ritter.ActiveItem) {
            if (Ritter.Params.useImgs) {
                this._currentItem.bitmap = ImageManager.loadPicture(Ritter.ActiveItem.toString());
            } else {
                var activeIndex = $dataItems[Ritter.ActiveItem].iconIndex;
                var w = Window_Base._iconWidth, h = Window_Base._iconHeight;
                this._currentItem.sx = activeIndex % 16 * w;
                this._currentItem.sy = Math.floor(activeIndex / 16) * h;
                this._currentItem.setFrame(this._currentItem.sx, this._currentItem.sy, w, h);
            }
            this._currentItem.x = $gamePlayer.screenX();
            this._currentItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
            this._currentItem.opacity = 255;
        } else {
            this._currentItem.opacity = 0;
        }

        // 更新【前一个道具】显示
        if (Ritter.PrevItem) {
            if (Ritter.Params.useImgs) {
                this._previousItem.bitmap = ImageManager.loadPicture(Ritter.PrevItem.toString());
            } else {
                var prevIndex = $dataItems[Ritter.PrevItem].iconIndex;
                var w = Window_Base._iconWidth, h = Window_Base._iconHeight;
                this._previousItem.sx = prevIndex % 16 * w;
                this._previousItem.sy = Math.floor(prevIndex / 16) * h;
                this._previousItem.setFrame(this._previousItem.sx, this._previousItem.sy, w, h);
            }
            this._previousItem.x = $gamePlayer.screenX() - Ritter.Params.popupXoffset;
            this._previousItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
            this._previousItem.opacity = 255;
        } else {
            this._previousItem.opacity = 0;
        }

        // 更新【前二个道具】显示
        if (Ritter.PrevItem2) {
            if (Ritter.Params.useImgs) {
                this._previousItem2.bitmap = ImageManager.loadPicture(Ritter.PrevItem2.toString());
            } else {
                var prev2Index = $dataItems[Ritter.PrevItem2].iconIndex;
                var w = Window_Base._iconWidth, h = Window_Base._iconHeight;
                this._previousItem2.sx = prev2Index % 16 * w;
                this._previousItem2.sy = Math.floor(prev2Index / 16) * h;
                this._previousItem2.setFrame(this._previousItem2.sx, this._previousItem2.sy, w, h);
            }
            // 使用两倍偏移量向左显示
            this._previousItem2.x = $gamePlayer.screenX() - 2 * Ritter.Params.popupXoffset;
            this._previousItem2.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
            this._previousItem2.opacity = 255;
        } else {
            this._previousItem2.opacity = 0;
        }

        // 更新【后一个道具】显示
        if (Ritter.NextItem) {
            if (Ritter.Params.useImgs) {
                this._nextItem.bitmap = ImageManager.loadPicture(Ritter.NextItem.toString());
            } else {
                var nextIndex = $dataItems[Ritter.NextItem].iconIndex;
                var w = Window_Base._iconWidth, h = Window_Base._iconHeight;
                this._nextItem.sx = nextIndex % 16 * w;
                this._nextItem.sy = Math.floor(nextIndex / 16) * h;
                this._nextItem.setFrame(this._nextItem.sx, this._nextItem.sy, w, h);
            }
            this._nextItem.x = $gamePlayer.screenX() + Ritter.Params.popupXoffset;
            this._nextItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
            this._nextItem.opacity = 255;
        } else {
            this._nextItem.opacity = 0;
        }

        // 更新【后二个道具】显示
        if (Ritter.NextItem2) {
            if (Ritter.Params.useImgs) {
                this._nextItem2.bitmap = ImageManager.loadPicture(Ritter.NextItem2.toString());
            } else {
                var next2Index = $dataItems[Ritter.NextItem2].iconIndex;
                var w = Window_Base._iconWidth, h = Window_Base._iconHeight;
                this._nextItem2.sx = next2Index % 16 * w;
                this._nextItem2.sy = Math.floor(next2Index / 16) * h;
                this._nextItem2.setFrame(this._nextItem2.sx, this._nextItem2.sy, w, h);
            }
            // 使用两倍偏移量向右显示
            this._nextItem2.x = $gamePlayer.screenX() + 2 * Ritter.Params.popupXoffset;
            this._nextItem2.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
            this._nextItem2.opacity = 255;
        } else {
            this._nextItem2.opacity = 0;
        }

        // 保留原先道具名称显示的逻辑，不作修改
        {
            var itemId = Ritter.ActiveItem; 
            var item = $dataItems[itemId]; 
            var itemNumber = $gameParty.numItems(item); 
            var itemColor = $gameTemp.drill_ITC_getColorCode_Item(itemId);

            var itemText = item.name; 
            var numberText = " (" + itemNumber.toString() + ")";

            this._activeItemName.bitmap.clear();
            
            // 设置自定义的描边效果
            this._activeItemName.bitmap.outlineColor = '#000000';
            this._activeItemName.bitmap.outlineWidth = 2;
            
            // 使用找到的颜色代码绘制道具名称
            this._activeItemName.bitmap.textColor = itemColor;
            var itemNameWidth = this._activeItemName.bitmap.measureTextWidth(itemText);
            var numberWidth = this._activeItemName.bitmap.measureTextWidth(numberText);
            var totalWidth = itemNameWidth + numberWidth;
            
            // 设置外发光效果
            var ctx = this._activeItemName.bitmap._context;
            ctx.shadowColor = 'rgba(0, 0, 0, 1)';  
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            // 绘制道具名称及数量
            this._activeItemName.bitmap.drawText(itemText, 0, 0, itemNameWidth, 48, 'left');
            this._activeItemName.bitmap.textColor = '#fff600';
            this._activeItemName.bitmap.drawText(numberText, itemNameWidth, 0, numberWidth, 48, 'left');
            
            // 调整位置以居中显示
            this._activeItemName.x = this._currentItem.x - totalWidth / 2;
            this._activeItemName.y = this._currentItem.y - 50;
            this._activeItemName.opacity = 255;
            this._activeItemName.totalWidth = totalWidth;
        }
    }

    // 当等待时间结束且弹出状态激活时，开始淡出所有图标
    // 这里仅在 _fade 尚未初始化时才设定一次初始值，避免每帧重置为60
    if (Ritter.ActiveItem_System._wait <= 0 && Ritter.popupActive === true) {
        if (this._fade === undefined || this._fade === null) {
            this._fade = 60;
        }
    }

    if (Ritter.ActiveItem_System._wait > 0) {
        Ritter.ActiveItem_System._wait--;
    }	
	
    if (this._fade !== undefined && this._fade !== null && this._fade >= 0 && Ritter.ActiveItem_System._wait === 0) {
        this.fadeOut();
    }
};




Spriteset_Map.prototype.fadeOut = function() {
    // 如果淡出计时器大于0且等待时间为0，则进行淡出处理
    if (this._fade > 0 && Ritter.ActiveItem_System._wait === 0) {
        // 每帧递减淡出计时器
        this._fade--;
        
        // 更新所有图标的不透明度
        this._currentItem.opacity = Math.max(this._currentItem.opacity - Ritter.Params.popupFadeSpeed, 0);
        this._previousItem.opacity = Math.max(this._previousItem.opacity - Ritter.Params.popupFadeSpeed, 0);
        this._previousItem2.opacity = Math.max(this._previousItem2.opacity - Ritter.Params.popupFadeSpeed, 0);
        this._nextItem.opacity = Math.max(this._nextItem.opacity - Ritter.Params.popupFadeSpeed, 0);
        this._nextItem2.opacity = Math.max(this._nextItem2.opacity - Ritter.Params.popupFadeSpeed, 0);
        this._activeItemName.opacity = Math.max(this._activeItemName.opacity - Ritter.Params.popupFadeSpeed, 0);
        
        // 同时更新各图标和道具名称的位置（以确保玩家移动时图标保持正确位置）
        this._currentItem.x = $gamePlayer.screenX();
        this._currentItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
        this._previousItem.x = $gamePlayer.screenX() - Ritter.Params.popupXoffset;
        this._previousItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
        this._previousItem2.x = $gamePlayer.screenX() - 2 * Ritter.Params.popupXoffset;
        this._previousItem2.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
        this._nextItem.x = $gamePlayer.screenX() + Ritter.Params.popupXoffset;
        this._nextItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
        this._nextItem2.x = $gamePlayer.screenX() + 2 * Ritter.Params.popupXoffset;
        this._nextItem2.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
        var totalWidth = this._activeItemName.totalWidth || 0;
        this._activeItemName.x = $gamePlayer.screenX() - totalWidth / 2;
        this._activeItemName.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset - 50;
    }
    
    // 当淡出计时器归零且等待时间为0时，将所有图标和名称强制隐藏，并关闭弹出状态
    if (this._fade <= 0 && Ritter.ActiveItem_System._wait === 0) {
        this._currentItem.opacity = 0;
        this._previousItem.opacity = 0;
        this._previousItem2.opacity = 0;
        this._nextItem.opacity = 0;
        this._nextItem2.opacity = 0;
        this._activeItemName.opacity = 0;
        $gameSystem._activeItem = false;
        Ritter.popupActive = false;
        // 重置 _fade 为 null，确保下次显示时能正确初始化
        this._fade = null;
    }
};



// END SPRITESET_MAP STUFF

var _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
	if (item == null) return;
	if (item.id === Ritter.ActiveItem) {
		Ritter.ActiveQuantity = this.numItems(item);
		$gameMap.requestRefresh();
	};
	if (!Ritter.ActiveItem && Ritter.Params.activeids.contains(item.id)) {
		for (var i = 0; i < Ritter.Params.activeids.length; i++) {
			if (item.id === Ritter.Params.activeids[i]) {
				Ritter.ActiveItem = item.id;
				Ritter.ActiveQuantity = this.numItems(item);
				$gameMap.requestRefresh();
			};
		};
	};
};

// Button Binding Stuff

Input.setupActiveItemButtons = function() {
	if (!Imported.YEP_KeyboardConfig) {
		Input.keyMapper[Ritter.Params.togForButton[0]] = Ritter.Params.togForButton[1];
		Input.keyMapper[Ritter.Params.togBackButton[0]] = Ritter.Params.togBackButton[1];
		Input.keyMapper[Ritter.Params.useItemButton[0]] = Ritter.Params.useItemButton[1];
	};
	if (Imported.YEP_KeyboardConfig && Ritter.Params.useButtonsOnOff && !Imported.Mano_InputConfig) {
		if (ConfigManager.defaultMap[Ritter.Params.togForButton[0]] !== Ritter.Params.togForButton[1]) {
			ConfigManager.defaultMap[Ritter.Params.togForButton[0]] = Ritter.Params.togForButton[1];
		};
	
		if (ConfigManager.wasdMap[Ritter.Params.wasdtogForButton[0]] !== Ritter.Params.togForButton[1]) {
			ConfigManager.wasdMap[Ritter.Params.wasdtogForButton[0]] = Ritter.Params.togForButton[1];
		};
	
		if (ConfigManager.defaultMap[Ritter.Params.togBackButton[0]] !== Ritter.Params.togBackButton[1]) {
			ConfigManager.defaultMap[Ritter.Params.togBackButton[0]] = Ritter.Params.togBackButton[1];
		};
	
		if (ConfigManager.wasdMap[Ritter.Params.wasdtogBackButton[0]] !== Ritter.Params.togBackButton[1]) {
			ConfigManager.wasdMap[Ritter.Params.wasdtogBackButton[0]] = Ritter.Params.togBackButton[1];
		};
	
		if (ConfigManager.defaultMap[Ritter.Params.useItemButton[0]] !== Ritter.Params.useItemButton[1]) {
			ConfigManager.defaultMap[Ritter.Params.useItemButton[0]] = Ritter.Params.useItemButton[1];
		};
	
		if (ConfigManager.wasdMap[Ritter.Params.wasduseItemButton[0]] !== Ritter.Params.useItemButton[1]) {
			ConfigManager.wasdMap[Ritter.Params.wasduseItemButton[0]] = Ritter.Params.useItemButton[1];
		};
	};
};

Ritter_ActiveItem_Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	Ritter_ActiveItem_Scene_Map_start.call(this);
	if (Ritter.Params.useButtonsOnOff) Input.setupActiveItemButtons();
	if (Ritter.Params.devMode) Input.setupDevModeButtons(); 
};

Ritter_ActiveItem_Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {
    Ritter_ActiveItem_Scene_Map_updateScene.call(this);
	if (!Ritter.Params.useButtonsOnOff) return;
	if ($gameMap.isEventRunning()) return;
	if (SceneManager.isSceneChanging()) return;
	this.updateActiveButtons();
	//if (Ritter.Params.devMode) this.devModeButtons();
};


Scene_Map.prototype.updateActiveButtons = function() {
	if (Input.isTriggered(Ritter.Params.togForButton[1]) || Input.drill_isPadTriggered('按键右')) Ritter.ActiveItem_System.toggle("forward");
	if (Input.isTriggered(Ritter.Params.togBackButton[1]) || Input.drill_isPadTriggered('按键左')) Ritter.ActiveItem_System.toggle("backward");
	if (Input.isTriggered(Ritter.Params.useItemButton[1]) || Input.drill_isPadTriggered('RB')) Ritter.ActiveItem_System.useItem();	
};

// Yanfly Keyboard Config Compatibility
if (Imported.YEP_KeyboardConfig && Ritter.Params.useButtonsOnOff && !Imported.Mano_InputConfig) {
	
	var Ritter_KeyConfig_commandDefault = Scene_KeyConfig.prototype.commandDefault;
	Scene_KeyConfig.prototype.commandDefault = function() {
		Ritter._wasdMap = false;
		Ritter_KeyConfig_commandDefault.call(this);
	};
	
	var Ritter_KeyConfig_commandWasd = Scene_KeyConfig.prototype.commandWasd;
	Scene_KeyConfig.prototype.commandWasd = function() {
		Ritter._wasdMap = true;
		Ritter_KeyConfig_commandWasd.call(this);
	};
	
	
	var Ritter_Window_KeyAction = Window_KeyAction.prototype.makeCommandList;
	Window_KeyAction.prototype.makeCommandList = function() {
		Ritter_Window_KeyAction.call(this);
		this.addCommand(Ritter.Params.togForName, 'ok', true, Ritter.Params.togForButton[1]);
		this.addCommand(Ritter.Params.togBackName, 'ok', true, Ritter.Params.togBackButton[1]);
		this.addCommand(Ritter.Params.useItemName, 'ok', true, Ritter.Params.useItemButton[1]);
	};
	
	var Ritter_Window_KeyConfig = Window_KeyConfig.prototype.actionKey;
	Window_KeyConfig.prototype.actionKey = function(action) {
		switch(action) {
			case Ritter.Params.togForButton[1]:
				return Ritter.Params.togForName;
				break;
			case Ritter.Params.togBackButton[1]:
				return Ritter.Params.togBackName;
				break;
			case Ritter.Params.useItemButton[1]:
				return Ritter.Params.useItemName;
				break;
			default:
				return Ritter_Window_KeyConfig.call(this,action);
				break;
		}
	};
};

// Developer Mode

Spriteset_Map.prototype.createDevText = function() {
	this._AIS_Yoffset = new Sprite();
	this._AIS_Yoffset.bitmap = new Bitmap(Graphics.width, Graphics.height);
	this._AIS_nextPrevXoffset = new Sprite();
	this._AIS_nextPrevXoffset.bitmap = new Bitmap(Graphics.width, Graphics.height);
	this._AIS_activeScale = new Sprite();
	this._AIS_activeScale.bitmap = new Bitmap(Graphics.width, Graphics.height);
	this._AIS_nextPrevScale = new Sprite();
	this._AIS_nextPrevScale.bitmap = new Bitmap(Graphics.width, Graphics.height);
	
	this.addChild(this._AIS_Yoffset);
	this.addChild(this._AIS_nextPrevXoffset);
	this.addChild(this._AIS_activeScale);
	this.addChild(this._AIS_nextPrevScale);
};

Spriteset_Map.prototype.devUpdate = function() {
	if ($gameMap.isEventRunning()) return;
	if (SceneManager.isSceneChanging()) return;
	if (Ritter.Params.useImgs) this._currentItem.bitmap = ImageManager.loadPicture(Ritter.Params.activeids[1]);
	if (!Ritter.Params.useImgs) {
		var activeIndex = $dataItems[Ritter.Params.activeids[1]].iconIndex;
		var prevIndex = $dataItems[Ritter.Params.activeids[0]].iconIndex;
		var nextIndex = $dataItems[Ritter.Params.activeids[2]].iconIndex;
		var w = Window_Base._iconWidth;
		var h = Window_Base._iconHeight;
		this._currentItem.bitmap = ImageManager.loadSystem("IconSet_large");
		this._currentItem.sx = activeIndex % 16 * w;
		this._currentItem.sy = Math.floor(activeIndex / 16) * h;
		this._currentItem.setFrame(this._currentItem.sx,this._currentItem.sy,w,h);
		this._currentItem.opacity = 255;
		this._currentItem.x = $gamePlayer.screenX();
		this._currentItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
		
		this._previousItem.sx = prevIndex % 16 * w;
		this._previousItem.sy = Math.floor(prevIndex / 16) * h;
		this._previousItem.setFrame(this._previousItem.sx,this._previousItem.sy,w,h);
		this._previousItem.opacity = 255;
		this._previousItem.x = $gamePlayer.screenX() - Ritter.Params.popupXoffset;
		this._previousItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
		
		this._nextItem.sx = nextIndex % 16 * w;
		this._nextItem.sy = Math.floor(nextIndex / 16) * h;
		this._nextItem.setFrame(this._nextItem.sx,this._nextItem.sy,w,h);
		this._nextItem.opacity = 255;
		this._nextItem.x = $gamePlayer.screenX() + Ritter.Params.popupXoffset;
		this._nextItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
		
	}
	this._currentItem.x = $gamePlayer.screenX();
	this._currentItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
	this._currentItem.opacity = 255;
	if (Ritter.Params.useImgs) this._previousItem.bitmap = ImageManager.loadPicture(Ritter.Params.activeids[0]);
	this._previousItem.x = $gamePlayer.screenX() - Ritter.Params.popupXoffset;
	this._previousItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
	this._previousItem.opacity = 255;
	if (Ritter.Params.useImgs) this._nextItem.bitmap = ImageManager.loadPicture(Ritter.Params.activeids[2]);
	this._nextItem.x = $gamePlayer.screenX() + Ritter.Params.popupXoffset;
	this._nextItem.y = $gamePlayer.screenY() - Ritter.Params.popupYoffset;
	this._nextItem.opacity = 255;
	this._currentItem.scale.x = Ritter.Params.activeScale;
	this._currentItem.scale.y = Ritter.Params.activeScale;
	this._previousItem.scale.x = Ritter.Params.npScale;
	this._previousItem.scale.y = Ritter.Params.npScale;
	this._nextItem.scale.x = Ritter.Params.npScale;
	this._nextItem.scale.y = Ritter.Params.npScale;
	// text
	this._AIS_nextPrevXoffset.bitmap.clear();
	this._AIS_nextPrevXoffset.bitmap.drawText("X Offset: " + Ritter.Params.popupXoffset, 10, 10, 300, 50, "left");
	this._AIS_Yoffset.bitmap.clear();
	this._AIS_Yoffset.bitmap.drawText("Y Offset: " + Ritter.Params.popupYoffset, 10, 60, 300, 50, "left");
	this._AIS_activeScale.bitmap.clear();
	this._AIS_activeScale.bitmap.drawText("Active Scale: " + parseFloat(Ritter.Params.activeScale).toFixed(2), 10, 110, 300, 50, "left");
	this._AIS_nextPrevScale.bitmap.clear();
	this._AIS_nextPrevScale.bitmap.drawText("Next/Prev Scale: " + parseFloat(Ritter.Params.npScale).toFixed(2), 10, 160, 300, 50, "left");
};

Input.setupDevModeButtons = function() {
		Input.keyMapper[98] = 'num2'; 
		Input.keyMapper[100] = 'num4'; 
		Input.keyMapper[102] = 'num6'; 
		Input.keyMapper[104] = 'num8'; 
		Input.keyMapper[107] = 'numPlus';
		Input.keyMapper[109] = 'numMinus';
		Input.keyMapper[106] = 'numTimes';
		Input.keyMapper[111] = 'numDivide';
};

Scene_Map.prototype.devModeButtons = function() {
	if (Input.isRepeated('num2')) Ritter.Params.popupYoffset -= 1;
	if (Input.isRepeated('num4')) Ritter.Params.popupXoffset -= 1;
	if (Input.isRepeated('num6')) Ritter.Params.popupXoffset += 1;
	if (Input.isRepeated('num8')) Ritter.Params.popupYoffset += 1;
	if (Input.isRepeated('numPlus')) Ritter.Params.npScale += .01;
	if (Input.isRepeated('numMinus')) Ritter.Params.npScale -= .01;
	if (Input.isRepeated('numTimes')) Ritter.Params.activeScale += .01;
	if (Input.isRepeated('numDivide')) Ritter.Params.activeScale -= .01;
};

// QInput Override
if (!!Imported.QInput) {
	const Input_OnKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    if (event.keyCode == Ritter.Params.togForButton[0] || event.keyCode == Ritter.Params.togBackButton[0] || event.keyCode == Ritter.Params.useItemButton[0]) {
		var buttonName = this.keyMapper[event.keyCode];
    	if (buttonName) {
        	this._currentState[buttonName] = false;
    	}
    	if (event.keyCode === 0) {  // For QtWebEngine on OS X
        	this.clear();
    	}
	} else {
		Input_OnKeyUp.call(this, event);
	}	
};

const Input_OnKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
	
	if (event.keyCode == Ritter.Params.togForButton[0] || event.keyCode == Ritter.Params.togBackButton[0] || event.keyCode == Ritter.Params.useItemButton[0]) {
		if (this._shouldPreventDefault(event.keyCode)) {
			event.preventDefault();
		}
		if (event.keyCode === 144) {    // Numlock
			this.clear();
		}
		var buttonName = this.keyMapper[event.keyCode];
		if (ResourceHandler.exists() && buttonName === 'ok') {
			ResourceHandler.retry();
		} else if (buttonName) {
			this._currentState[buttonName] = true;
		}
	} else {
		Input_OnKeyDown.call(this, event);
	}
	
		
		
  };
}


})();