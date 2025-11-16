import os
import sys

def collect_files(root_dir, extensions):
    """
    Рекурсивно собирает пути файлов с заданными расширениями.
    extensions — список строк, например ['.py', '.md']
    """
    matched_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if any(filename.lower().endswith(ext.lower()) for ext in extensions):
                full_path = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(full_path, root_dir)
                matched_files.append((full_path, rel_path))
    return matched_files


def read_file_safe(filepath):
    """Пытается прочитать файл с разными кодировками."""
    for encoding in ['utf-8', 'latin-1', 'cp1251']:
        try:
            with open(filepath, 'r', encoding=encoding) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
    # Если всё провалилось — возвращаем заглушку
    return f"[Содержимое не удалось прочитать (кодировка не определена)]\n"


def main():
    # Настройки — можно вынести в аргументы CLI по желанию
    root_directory = input("Введите путь к корневой папке (или оставьте пустым для текущей): ").strip()
    if not root_directory:
        root_directory = '.'

    extensions_input = input("Введите расширения файлов через запятую (напр. .py,.md,.txt): ").strip()
    extensions = [ext.strip() for ext in extensions_input.split(',') if ext.strip()]

    if not extensions:
        print("Не указаны расширения — использую по умолчанию: .py, .txt, .md")
        extensions = ['.jsx', '.css']

    output_file = input("Имя выходного файла (по умолчанию: collected_content.txt): ").strip()
    if not output_file:
        output_file = "collected_content.txt"

    # Сбор файлов
    print(f"Поиск файлов с расширениями: {extensions} в '{os.path.abspath(root_directory)}'...")
    files = collect_files(root_directory, extensions)

    if not files:
        print("Файлы не найдены.")
        return

    print(f"Найдено {len(files)} файлов. Запись в '{output_file}'...")

    # Запись в выходной файл
    try:
        with open(output_file, 'w', encoding='utf-8') as out_f:
            for full_path, rel_path in files:
                header = f"\n{'='*60}\n# {rel_path}\n{'='*60}\n"
                content = read_file_safe(full_path)
                out_f.write(header)
                out_f.write(content)
                out_f.write("\n\n")
        print(f"✅ Готово! Содержимое сохранено в: {os.path.abspath(output_file)}")
    except Exception as e:
        print(f"❌ Ошибка записи: {e}")


if __name__ == "__main__":
    main()