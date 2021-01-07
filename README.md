# Aqoda

Self Check-in & Check-out System

## Scenario

เมื่อแขกเดินทางมาถึงที่พัก จะต้องแจ้งเลขห้อง ชื่อและอายุ เพื่อทำ Check-in เข้าพัก จากนั้นระบบจะออก Keycard ให้แขกเพื่อใช้ในการเปิดประตูห้องพัก

และเมื่อแขกต้องการ Check-out จะต้องนำ Keycard มาคืนพร้อมแจ้งชื่อ ให้ตรงกับที่ระบุไว้ใน Keycard ตอน Check-in ถึงจะสามารถ Check-out ได้

## Available Commands

- `create_hotel <number_of_floor> <number_of_room_per_floor>`

  สร้างโรงแรม โดยเลขห้องพักจะต้องเป็นเลข 3 หลัก ตัวแรกคือเลขชั้น ส่วน 2 เลขที่เหลือคือเลขห้อง ซึ่งเริ่มจาก 01

- `book <room_number> <guest_name> <guest_age>`

  จองห้องพัก

- `book_by_floor <floor> <guest_name> <guest_age>`

  จองห้องพักทั้งหมดที่อยู่ในชั้นที่ระบุ โดยจะทำการจองได้ก็ต่อเมื่อห้องพักทุกห้องในชั้นนั้นต้องว่างทั้งหมดเท่านั้น

- `checkout <keycard_number> <guest_name>`

  คืนห้องพัก

- `checkout_guest_by_floor <floor>`

  คืนห้องพักในชั้นที่ระบุทั้งหมด

- `get_guest_in_room <room_number>`

  ดูชื่อแขกที่กำลังเข้าพักในห้องพักที่ระบุ

- `list_available_rooms`

  ดูรายการห้องพักที่ว่างทั้งหมด

- `list_guest`

  ดูรายชื่อแขกที่กำลังเข้าพักทั้งหมด

- `list_guest_by_age <operator> <age>`

  ดูรายชื่อแขกที่กำลังเข้าพักทั้งหมดที่มีอายุตามที่ระบุ

- `list_guest_by_floor <floor>`

  ดูรายชื่อแขกที่กำลังเข้าพักทั้งหมดที่พักอยู่ในชั้นที่ระบุ

## Available Scripts

- `node main`

  รันโปรแกรม โดยรับ input จาก [input.txt](input.txt) (ผลลัพธ์ที่ได้ควรตรงกับ [output.txt](output.txt))
