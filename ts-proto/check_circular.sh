# 不能用Windows的cmd来执行,否则madge指令的过滤规则没法生效

# 在此加入需要忽略的文件
ignore_files=(
    'react-umg\.ts',
    'circular/class_case_fail'
    'circular/class_case_ok'
    'circular/error_case'
    'types/immer'
)

regx=$(IFS=\| ; echo "${ignore_files[*]}")
# echo "$regx"

madge -c --warning --extensions ts,tsx -x "$regx" ./TypeScript