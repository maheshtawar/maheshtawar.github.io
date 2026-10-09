import os
import shutil

current_conv = "ad71c4b1-df3e-4c02-a04f-acdaaf59473a"
brain_base = r"C:\Users\mahes\.gemini\antigravity-ide\brain"

freed_bytes = 0
deleted_convs = 0

if os.path.exists(brain_base):
    for entry in os.listdir(brain_base):
        if entry != current_conv:
            full_path = os.path.join(brain_base, entry)
            if os.path.isdir(full_path):
                try:
                    for root, dirs, files in os.walk(full_path):
                        for f in files:
                            try:
                                freed_bytes += os.path.getsize(os.path.join(root, f))
                            except Exception:
                                pass
                    shutil.rmtree(full_path, ignore_errors=True)
                    deleted_convs += 1
                except Exception:
                    pass

# Also clean any old temp files in .gemini
gemini_dir = r"C:\Users\mahes\.gemini"
for sub in ["temp", "tmp", "cache"]:
    sub_path = os.path.join(gemini_dir, sub)
    if os.path.exists(sub_path):
        try:
            shutil.rmtree(sub_path, ignore_errors=True)
        except Exception:
            pass

mb_freed = freed_bytes / (1024 * 1024)
print(f"Cleanup finished: Deleted {deleted_convs} past unused sessions. Freed {mb_freed:.2f} MB while keeping current chat intact.")
