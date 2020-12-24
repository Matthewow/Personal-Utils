from januscloud.common.schema import Schema, Optional, DoNotCare, \
    Use, IntVal, Default, SchemaError, BoolVal, StrRe, ListVal, Or, STRING, \
    FloatVal, AutoDel, StrVal, EnumVal

room_base_schema = Schema({
    'action': EnumVal(['enable', 'disable', 'add', 'remove']),
    'publisher_id': IntVal(min=1),
    'stream_id': IntVal(min=0),
    Optional('secret'): Default(StrVal(max_len=256), default=''),
    Optional('room'): Default(IntVal(min=0), default=0),
    Optional('permanent'): Default(BoolVal(), default=False),
    Optional('stime'): Default(IntVal(min=0), default = 0),
    Optional('etime'): Default(IntVal(min=0), default = 0),
    AutoDel(str): object  # for all other key we must delete
})
