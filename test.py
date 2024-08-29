class TodoItem:
    def __init__(self, title, description):
        self.title = title
        self.description = description
        self.completed = False

    def __str__(self):
        status = "Completed" if self.completed else "Pending"
        return f"{self.title} - {self.description} [{status}]"


class TodoList:
    def __init__(self):
        self.todos = []

    def add_item(self, title, description):
        item = TodoItem(title, description)
        self.todos.append(item)

    def mark_complete(self, title):
        for todo in self.todos:
            if todo.title == title:
                todo.completed = True
                print(f"Marked '{todo.title}' as completed.")
                return
        print(f"Could not find '{title}' in the To-Do list.")

    def display_list(self):
        if not self.todos:
            print("No items in the To-Do list.")
        else:
            print("To-Do List:")
            for todo in self.todos:
                print(todo)

    def save_to_file(self, filename):
        with open(filename, 'w') as f:
            for todo in self.todos:
                f.write(f"{todo.title},{todo.description},{todo.completed}\n")
        print(f"To-Do list saved to {filename}.")

    def load_from_file(self, filename):
        self.todos = []
        try:
            with open(filename, 'r') as f:
                for line in f:
                    parts = line.strip().split(',')
                    title = parts[0]
                    description = parts[1]
                    completed = parts[2] == 'True'
                    item = TodoItem(title, description)
                    item.completed = completed
                    self.todos.append(item)
            print(f"To-Do list loaded from {filename}.")
        except FileNotFoundError:
            print(f"File '{filename}' not found.")

def main():
    todo_list = TodoList()

    while True:
        print("\n=== To-Do List Menu ===")
        print("1. Add item")
        print("2. Mark item as complete")
        print("3. Display To-Do list")
        print("4. Save To-Do list to file")
        print("5. Load To-Do list from file")
        print("6. Exit")

        choice = input("Enter your choice (1-6): ")

        if choice == '1':
            title = input("Enter title: ")
            description = input("Enter description: ")
            todo_list.add_item(title, description)
        elif choice == '2':
            title = input("Enter title of item to mark as complete: ")
            todo_list.mark_complete(title)
        elif choice == '3':
            todo_list.display_list()
        elif choice == '4':
            filename = input("Enter filename to save to: ")
            todo_list.save_to_file(filename)
        elif choice == '5':
            filename = input("Enter filename to load from: ")
            todo_list.load_from_file(filename)
        elif choice == '6':
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please enter a number from 1 to 6.")

if __name__ == "__main__":
    main()
